import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { ARTICLES_SERVICE } from '../../../services/articles/articles-service.token';
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
  providers: [PostPageService, PostPageStoreService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPage {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);

  private readonly articlesService = inject(ARTICLES_SERVICE);
  private readonly postPageService = inject(PostPageService);
  private readonly postPageStore = inject(PostPageStoreService);

  protected readonly article = this.postPageStore.article;
  protected readonly comments = this.postPageStore.comments;

  constructor() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id') ?? ''),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((articleId) => {
        this.loadPost(articleId);
      });
  }

  protected changeArticleRating(delta: number): void {
    const article = this.article();

    if (!article) {
      return;
    }

    this.articlesService
      .changeArticleRating(article.id, delta)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((updatedArticle) => {
        if (!updatedArticle) {
          return;
        }

        this.postPageStore.saveResponse({
          article: updatedArticle,
          comments: this.comments(),
        });
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
        this.postPageStore.saveResponse({
          article,
          comments: response.comments,
        });
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
        this.postPageStore.saveResponse({
          article,
          comments: response.comments,
        });
      });
  }

  private loadPost(articleId: string): void {
    if (!articleId) {
      this.postPageStore.clear();
      this.titleService.setTitle('Статья не найдена');
      return;
    }

    this.articlesService
      .getArticleById(articleId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((article) => {
        if (!article) {
          this.postPageStore.clear();
          this.titleService.setTitle('Статья не найдена');
          return;
        }

        this.postPageService
          .getPostWithComments(article.id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((response) => {
            this.postPageStore.saveResponse({
              article,
              comments: response.comments,
            });

            this.titleService.setTitle(article.title);
          });
      });
  }
}