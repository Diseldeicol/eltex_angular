import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import type { ArticleComment } from '../../../types/article.comment.type';

@Component({
  selector: 'app-post-comment-card',
  standalone: true,
  imports: [DatePipe, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './post-comment-card.html',
  styleUrl: './post-comment-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCommentCard {
  @Input({ required: true }) comment!: ArticleComment;

  @Output() ratingChange = new EventEmitter<{
    comment: ArticleComment;
    delta: number;
  }>();

  protected decreaseRating(): void {
    this.ratingChange.emit({
      comment: this.comment,
      delta: -1,
    });
  }

  protected increaseRating(): void {
    this.ratingChange.emit({
      comment: this.comment,
      delta: 1,
    });
  }
}