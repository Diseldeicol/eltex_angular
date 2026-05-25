import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { ARTICLES_SERVICE } from '../../../services/articles/articles-service.token';
import type { Article } from '../../../types/article.type';
import { IndexAboutMeSection } from '../../components/index-about-me-section/index-about-me-section';
import { IndexHobby } from '../../components/index-hobby/index-hobby';
import { IndexMyWork } from '../../components/index-my-work/index-my-work';
import { IndexSkillsSection } from '../../components/index-skills-section/index-skills-section';
import { MainArticleCard } from '../../components/main-article-card/main-article-card';

@Component({
  selector: 'app-index',
  imports: [
    RouterLink,
    MainArticleCard,
    IndexAboutMeSection,
    IndexSkillsSection,
    IndexMyWork,
    IndexHobby,
  ],
  templateUrl: './index.html',
  styleUrl: './index.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Index {
  private readonly destroyRef = inject(DestroyRef);
  private readonly titleService = inject(Title);
  private readonly articlesService = inject(ARTICLES_SERVICE);

  protected readonly articles = signal<Article[]>([]);

  public ngOnInit(): void {
    this.titleService.setTitle('BlogApp');

    this.articlesService
      .getArticles(1, 2)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        this.articles.set(response.articles);
      });
  }
}