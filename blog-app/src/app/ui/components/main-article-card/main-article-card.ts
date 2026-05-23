import { ChangeDetectionStrategy, Component,  Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../../types/article.type';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-main-article-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './main-article-card.html',
  styleUrl: './main-article-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainArticleCard { 
  
  @Input({ required: true }) article!: Article;
}
