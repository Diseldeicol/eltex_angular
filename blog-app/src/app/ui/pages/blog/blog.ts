import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BlogArticleCard } from '../../components/blog-article-card/blog-article-card';
import { Article } from '../../../types/article.type';
import { ARTICLES } from '../../../data/articles.data';
import { Form } from "../../components/form/form";
import { StatisticDialog } from "../../components/statistic-dialog/statistic-dialog";

@Component({
  selector: 'app-blog',
  imports: [BlogArticleCard, Form, StatisticDialog],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog {
  articles: Article[] = [];
  isEditForm: boolean = false;
  showDialog: boolean = false;
  private closeFormTimer: ReturnType<typeof setTimeout> | null = null;
  protected editingArticle: Article | null = null;

  ngOnInit(): void {
    this.articles = [...ARTICLES];
  }

  openAddForm(): void {
    if (this.closeFormTimer) {
      clearTimeout(this.closeFormTimer);
      this.closeFormTimer = null;
    }

    this.editingArticle = null;
    this.isEditForm = true;
  }

  openEditForm(article: Article): void {
    if (this.closeFormTimer) {
      clearTimeout(this.closeFormTimer);
      this.closeFormTimer = null;
    }

    this.editingArticle = article;
    this.isEditForm = true;
  }

  closeForm(): void {
    this.isEditForm = false;

    if (this.closeFormTimer) {
      clearTimeout(this.closeFormTimer);
    }

    this.closeFormTimer = setTimeout(() => {
      this.editingArticle = null;
      this.closeFormTimer = null;
    }, 250);
  }

  showStat(): void{
    this.showDialog=true;
  }

  closeDialog(): void{
    this.showDialog=false;
  }

  onDeleteArticle(id:number): void{
    this.articles = this.articles.filter(article => article.id !== id);
  }
  protected onSaveArticle(value: Pick<Article, 'title' | 'text'>): void {
    if (this.editingArticle) {
      this.articles = this.articles.map(article => {
        if (article.id !== this.editingArticle?.id) {
          return article;
        }

        return {
          ...article,
          title: value.title,
          text: value.text,
        };
      });
    } else {
      const newArticle: Article = {
        id: this.getNextArticleId(),
        title: value.title,
        text: value.text,
        date: new Date().toISOString().slice(0, 10),
        imageUrl: 'images/noname_photo.png',
      };

      this.articles = [...this.articles, newArticle];
    }

    this.closeForm();
  }

  private getNextArticleId(): number {
    if (this.articles.length === 0) {
      return 1;
    }

    return Math.max(...this.articles.map(article => article.id)) + 1;
  }
 }
