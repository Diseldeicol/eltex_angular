import { ChangeDetectionStrategy, Component,  Input } from '@angular/core';
import { Article } from '../../../items/article.item';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-main-article-card',
  imports: [DatePipe],
  templateUrl: './main-article-card.html',
  styleUrl: './main-article-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainArticleCard { 
  
  @Input({ required: true }) article!: Article;
}
