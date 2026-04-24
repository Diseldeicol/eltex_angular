import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../../../items/article.item';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-article-card',
  imports: [DatePipe],
  templateUrl: './blog-article-card.html',
  styleUrl: './blog-article-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogArticleCard { 
  @Input({ required: true }) article!: Article;
  @Output() onDeleteEvent = new EventEmitter<number>();

  onDelete(): void {
    this.onDeleteEvent.emit(this.article.id);
  }
}
