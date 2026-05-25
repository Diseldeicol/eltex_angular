import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { BlogArticleCard } from '../../components/blog-article-card/blog-article-card';
import { switchMap } from 'rxjs';
import { CategoriesService } from '../../../services/categories/categories.service';
import type { ArticleFormData } from '../../../types/article.form.data.type';
import { Article } from '../../../types/article.type';
import { MatIconModule } from '@angular/material/icon';
import { Form } from "../../components/form/form";
import { StatisticDialog } from "../../components/statistic-dialog/statistic-dialog";
import { ArticlesStoreService } from '../../../services/articles/articles-store.service';
import { ARTICLES_SERVICE } from '../../../services/articles/articles-service.token';

@Component({
  selector: 'app-blog',
  imports: [BlogArticleCard, Form, StatisticDialog, MatIconModule],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog {
  private readonly titleService = inject(Title);
  private readonly destroyRef = inject(DestroyRef);
  private readonly articlesService = inject(ARTICLES_SERVICE);
  private readonly articlesStore = inject(ArticlesStoreService);
  private readonly categoriesService = inject(CategoriesService);

  protected readonly articles = this.articlesStore.articles;
  protected readonly totalCount = this.articlesStore.totalCount;
  protected readonly activePage = this.articlesStore.activePage;
  protected readonly totalPages = this.articlesStore.totalPages;
  protected readonly pageSize = this.articlesStore.pageSize;

  protected readonly pages = computed(() => {
    const pages: number[] = [];

    for (let page = 1; page <= this.totalPages(); page++) {
      pages.push(page);
    }

    return pages;}
  );
  
  protected isEditForm = signal(false);
  protected readonly saveError = signal<string | null>(null);

  showDialog: boolean = false;
  protected editingArticle: Article | null = null;

  public ngOnInit(): void {
    this.titleService.setTitle('BlogApp');
    this.loadArticles(this.activePage());
  }
  
  private loadArticles(page: number): void {
    this.articlesService
      .getArticles(page, this.articlesStore.pageSize())
      .pipe(takeUntilDestroyed(this.destroyRef))
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
    this.saveError.set(null);
    this.editingArticle = null;
    this.isEditForm.set(true);
  }

  openEditForm(article: Article): void {
    this.saveError.set(null);
    this.editingArticle = article;
    this.isEditForm.set(true);
  }

  closeForm(): void {
    this.saveError.set(null);
    this.isEditForm.set(false);
    this.editingArticle = null;
  }

  showStat(): void{
    this.showDialog=true;
  }

  closeDialog(): void{
    this.showDialog=false;
  }

  protected onDeleteArticle(id:string): void{
    if (this.editingArticle?.id === id) {
      this.closeForm();
    }
    this.articlesService
    .deleteArticle(id, this.activePage(), this.articlesStore.pageSize())
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((response) => {
      this.articlesStore.saveResponse(response);
    });
  }
  protected onSaveArticle(value: ArticleFormData): void {
    this.saveError.set(null);

    const editingArticle = this.editingArticle;

    this.categoriesService
      .ensureCategory(value.categoryName)
      .pipe(
        switchMap((category) => {
          const articleData: ArticleFormData = {
            ...value,
            categoryId: category?.id ?? null,
            categoryName: category?.name ?? value.categoryName ?? null,
          };

          if (editingArticle) {
            return this.articlesService.updateArticle(
              editingArticle.id,
              articleData,
              this.activePage(),
              this.articlesStore.pageSize(),
            );
          }

          return this.articlesService.addArticle(
            articleData,
            this.activePage(),
            this.articlesStore.pageSize(),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (response) => {
          this.articlesStore.saveResponse(response);
          this.closeForm();
        },
        error: (error: unknown) => {
          console.error('Ошибка сохранения статьи:', error);
          this.saveError.set(this.getSaveErrorMessage(error));
        },
      });
  }
  private getSaveErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 500) {
        return 'Не удалось сохранить статью. Возможно, статья с таким заголовком уже существует.';
      }

      if (error.status === 0) {
        return 'Не удалось подключиться к серверу. Проверьте, что бэкенд запущен.';
      }

      return `Не удалось сохранить статью. Ошибка сервера: ${error.status}.`;
    }

    return 'Не удалось сохранить статью. Попробуйте ещё раз.';
  }
}
