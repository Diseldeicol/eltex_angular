import { ChangeDetectionStrategy, Component, signal,computed, inject } from '@angular/core';

import { BlogArticleCard } from '../../components/blog-article-card/blog-article-card';
import { Article } from '../../../types/article.type';
import { MatIconModule } from '@angular/material/icon';
import { ARTICLES } from '../../../data/articles.data';
import { Form } from "../../components/form/form";
import { StatisticDialog } from "../../components/statistic-dialog/statistic-dialog";
import { ArticlesStoreService } from '../../../services/articles/articles-store.service';
import { ArticlesService } from '../../../services/articles/articles.service';
import { ARTICLES_SERVICE } from '../../../services/articles/articles-service.token';

@Component({
  selector: 'app-blog',
  imports: [BlogArticleCard, Form, StatisticDialog, MatIconModule],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog {
  private readonly articlesService = inject(ARTICLES_SERVICE);
  private readonly articlesStore = inject(ArticlesStoreService)
  private readonly pageSize = 7;

  protected readonly articles = this.articlesStore.articles;
  protected readonly totalCount = this.articlesStore.totalCount;
  protected readonly activePage = this.articlesStore.activePage;
  protected readonly totalPages = this.articlesStore.totalPages;
  protected readonly pages = computed(() => {
    const pages: number[] = [];

    for (let page = 1; page <= this.totalPages(); page++) {
      pages.push(page);
    }

    return pages;}
  );
  
  protected isEditForm = signal(false);
  showDialog: boolean = false;
  protected editingArticle: Article | null = null;

  public ngOnInit(): void {
    if (this.articles().length > 0 && this.articlesStore.pageSize() === this.pageSize) {
      return;
    }

    this.loadArticles(this.activePage());
  }
  private loadArticles(page: number): void {
    this.articlesService.getArticles(page, this.pageSize)
      .subscribe((response) => {
        this.articlesStore.saveResponse(response);
      });
  }

  protected changePage(page: number): void {
    if (page === this.activePage() || page < 1 || page > this.totalPages()) {
      return;
    }

    this.closeForm();
    this.loadArticles(page);

    document.getElementById('articles-section')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  openAddForm(): void {
    this.editingArticle = null;
    this.isEditForm.set(true);
  }

  openEditForm(article: Article): void {
    this.editingArticle = article;
    this.isEditForm.set(true);
  }

  closeForm(): void {
    this.isEditForm.set(false);
    this.editingArticle = null;
  }

  showStat(): void{
    this.showDialog=true;
  }

  closeDialog(): void{
    this.showDialog=false;
  }

  protected onDeleteArticle(id:number): void{
    if (this.editingArticle?.id === id) {
      this.closeForm();
    }
    this.articlesService.deleteArticle(id, this.activePage(),this.pageSize).subscribe((response) => {
      this.articlesStore.saveResponse(response);
    })
  }

  protected onSaveArticle(value: Pick<Article, 'title' | 'text'>): void {
    if (this.editingArticle) {
      this.articlesService.updateArticle(this.editingArticle.id, value, this.activePage(), this.pageSize).subscribe((response) => {
        this.articlesStore.saveResponse(response);
        this.closeForm();
      });

      return;
    }

    this.articlesService
      .addArticle(value, this.activePage(), this.pageSize).subscribe((response) => {
        this.articlesStore.saveResponse(response);
        this.closeForm();
      });  
  
  }
}
