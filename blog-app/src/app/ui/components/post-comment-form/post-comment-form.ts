import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import type { ArticleComment } from '../../../types/article.comment.type';

@Component({
  selector: 'app-post-comment-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './post-comment-form.html',
  styleUrl: './post-comment-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCommentForm {
  @Output() commentAdd = new EventEmitter<Pick<ArticleComment, 'author' | 'text'>>();

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

  protected addComment(): void {
    if (this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }

    const formValue = this.commentForm.getRawValue();

    this.commentAdd.emit({
      author: formValue.author.trim(),
      text: formValue.text.trim(),
    });

    this.commentForm.reset();
  }
}