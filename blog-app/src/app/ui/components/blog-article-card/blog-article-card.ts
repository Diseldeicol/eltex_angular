import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Article } from '../../../types/article.type';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-article-card',
  standalone: true,
  imports: [DatePipe, RouterLink, MatIconModule],
  templateUrl: './blog-article-card.html',
  styleUrl: './blog-article-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogArticleCard { 
  @Input({ required: true }) article!: Article;
  @Output() onDeleteEvent = new EventEmitter<string>();
  @Output() onEditEvent = new EventEmitter<Article>();

  protected onDelete(): void {
    this.onDeleteEvent.emit(this.article.id);
  }
  protected onEdit(): void {
    this.onEditEvent.emit(this.article);
  }
}
