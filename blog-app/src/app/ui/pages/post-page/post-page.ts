import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, pairwise, startWith } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  ArticleEventsService,
  type ArticleEvent,
} from '../../../services/article-events.service';
import { PostPageGraphqlService } from '../../../services/articles/post-page/post-page-graphql.service';
import { POST_PAGE_SERVICE } from '../../../services/articles/post-page/post-page-service.token';
import { PostPageService } from '../../../services/articles/post-page/post-page.service';
import { PostPageStoreService } from '../../../services/articles/post-page/post-page-store.service';
import type { ArticleComment } from '../../../types/article.comment.type';
import { PostCommentCard } from '../../components/post-comment-card/post-comment-card';
import { PostCommentForm } from '../../components/post-comment-form/post-comment-form';

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    PostCommentCard,
    PostCommentForm,
  ],
  templateUrl: './post-page.html',
  styleUrl: './post-page.scss',
  providers: [
    PostPageService,
    PostPageGraphqlService,
    PostPageStoreService,
    {
      provide: POST_PAGE_SERVICE,
      useClass: environment.useBackendApi ? PostPageGraphqlService : PostPageService,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPage {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);

  private readonly articleEventsService = inject(ArticleEventsService);
  private readonly postPageService = inject(POST_PAGE_SERVICE);
  private readonly postPageStore = inject(PostPageStoreService);

  protected readonly article = this.postPageStore.article;
  protected readonly comments = this.postPageStore.comments;

  constructor() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id') ?? ''),
        startWith(''),
        pairwise(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(([previousArticleId, articleId]) => {
        if (previousArticleId) {
          this.articleEventsService.unsubscribeArticle(previousArticleId);
        }

        this.loadPost(articleId);
      });

    this.articleEventsService.events$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.handleArticleEvent(event));

    this.destroyRef.onDestroy(() => {
      const article = this.article();

      if (article) {
        this.articleEventsService.unsubscribeArticle(article.id);
      }

      this.articleEventsService.disconnect();
    });
  }

  protected changeArticleRating(delta: number): void {
    const article = this.article();

    if (!article) {
      return;
    }

    this.postPageService
      .changeArticleRating(article.id, delta)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        this.postPageStore.saveResponse(response);
      });
  }

  protected onCommentRatingChange(event: {
    comment: ArticleComment;
    delta: number;
  }): void {
    this.changeCommentRating(event.comment, event.delta);
  }

  protected addComment(comment: Pick<ArticleComment, 'author' | 'text'>): void {
    const article = this.article();

    if (!article) {
      return;
    }

    this.postPageService
      .addComment(article.id, comment)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        this.postPageStore.saveResponse(response);
      });
  }

  private changeCommentRating(comment: ArticleComment, delta: number): void {
    const article = this.article();

    if (!article) {
      return;
    }

    this.postPageService
      .changeCommentRating(article.id, comment.id, delta)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        this.postPageStore.saveResponse(response);
      });
  }

  private loadPost(articleId: string): void {
    if (!articleId) {
      this.postPageStore.clear();
      this.titleService.setTitle('Статья не найдена');
      return;
    }

    this.postPageService
      .getPostWithComments(articleId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        if (!response.article) {
          this.postPageStore.clear();
          this.titleService.setTitle('Статья не найдена');
          return;
        }

        this.postPageStore.saveResponse(response);
        this.titleService.setTitle(response.article.title);
        this.articleEventsService.subscribeArticle(response.article.id);
      });
  }

  private handleArticleEvent(event: ArticleEvent): void {
    const article = this.article();

    if (!article) {
      return;
    }

    if (
      event.type === 'ARTICLE_RATING_CHANGED' &&
      event.payload.articleId === article.id
    ) {
      this.postPageStore.updateArticleRating(article.id, event.payload.rating);
      return;
    }

    if (
      event.type === 'COMMENT_RATING_CHANGED' &&
      event.payload.articleId === article.id
    ) {
      this.postPageStore.updateCommentRating(event.payload.commentId, event.payload.rating);
      return;
    }

    if (event.type === 'COMMENT_CREATED' && event.payload.articleId === article.id) {
      this.postPageStore.upsertComment({
        id: event.payload.commentId,
        articleId: event.payload.articleId,
        author: event.payload.username,
        text: event.payload.content,
        date: String(event.payload.createdAt),
        rating: 0,
      });
    }
  }
}
