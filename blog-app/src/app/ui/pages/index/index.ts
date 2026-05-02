import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../../types/article.type';
import { ARTICLES } from '../../../data/articles.data';
import { MainArticleCard } from '../../components/main-article-card/main-article-card';


@Component({
  selector: 'app-index',
  imports: [RouterLink, MainArticleCard],
  templateUrl: './index.html',
  styleUrl: './index.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Index { 
  protected articles: Article[] = [];

  private ngOnInit(): void {
    this.articles = ARTICLES.slice(0, 2);
  }
}
