import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { PostPageService } from '../../../services/articles/post-page/post-page.service';
import { PostPageStoreService } from '../../../services/articles/post-page/post-page-store.service';
import type { ArticleComment } from '../../../types/article.comment.type';

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [
    DatePipe,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './post-page.html',
  styleUrl: './post-page.scss',
  providers: [PostPageService, PostPageStoreService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPage {
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);
  private readonly postPageService = inject(PostPageService);
  private readonly postPageStore = inject(PostPageStoreService);

  protected readonly article = this.postPageStore.article;
  protected readonly comments = this.postPageStore.comments;

  protected readonly commentForm = new FormGroup({
    author: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(40)],
    }),
    text: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(500)],
    }),
  });

  constructor() {
    this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        takeUntilDestroyed(),
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

    this.postPageService.changeArticleRating(article.id, delta).subscribe((response) => {
      this.postPageStore.saveResponse(response);
    });
  }

  protected changeCommentRating(comment: ArticleComment, delta: number): void {
    const article = this.article();

    if (!article) {
      return;
    }

    this.postPageService.changeCommentRating(article.id, comment.id, delta).subscribe((response) => {
      this.postPageStore.saveResponse(response);
    });
  }

  protected addComment(): void {
    const article = this.article();

    if (!article || this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }

    const formValue = this.commentForm.getRawValue();

    this.postPageService
      .addComment(article.id, {
        author: formValue.author.trim(),
        text: formValue.text.trim(),
      })
      .subscribe((response) => {
        this.postPageStore.saveResponse(response);
        this.commentForm.reset();
      });
  }

  private loadPost(articleId: number): void {
    if (!Number.isInteger(articleId) || articleId <= 0) {
      this.postPageStore.clear();
      this.titleService.setTitle('Статья не найдена');
      return;
    }

    this.postPageService.getPostWithComments(articleId).subscribe((response) => {
      this.postPageStore.saveResponse(response);

      if (response.article) {
        this.titleService.setTitle(response.article.title);
        return;
      }

      this.titleService.setTitle('Статья не найдена');
    });
  }
}