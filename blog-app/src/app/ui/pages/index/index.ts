import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ARTICLES_SERVICE } from '../../../services/articles/articles-service.token';
import { ArticlesStoreService } from '../../../services/articles/articles-store.service';
import { MainArticleCard } from '../../components/main-article-card/main-article-card';
import { IndexAboutMeSection } from "../../components/index-about-me-section/index-about-me-section";
import { IndexSkillsSection } from "../../components/index-skills-section/index-skills-section";
import { IndexMyWork } from "../../components/index-my-work/index-my-work";
import { IndexHobby } from "../../components/index-hobby/index-hobby";


@Component({
  selector: 'app-index',
  imports: [RouterLink, MainArticleCard, IndexAboutMeSection, IndexSkillsSection, IndexMyWork, IndexHobby],
  templateUrl: './index.html',
  styleUrl: './index.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Index { 
  private readonly articlesService = inject(ARTICLES_SERVICE);
  private readonly articlesStore = inject(ArticlesStoreService);
  protected readonly articles = this.articlesStore.articles;

  public ngOnInit(): void {
    if(this.articles().length > 0 && this.articlesStore.activePage() == 1 &&  this.articlesStore.pageSize() === 2) {
      return;
    }
    
    this.articlesService.getArticles(1,2).subscribe((response) =>
      this.articlesStore.saveResponse(response));
  }
}
