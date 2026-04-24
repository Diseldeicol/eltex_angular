import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BlogArticleCard } from '../../components/blog-article-card/blog-article-card';
import { Article } from '../../../items/article.item';
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

  ngOnInit(): void {
    this.articles = [...ARTICLES];
  }

  EditForm(): void {
    this.isEditForm = !this.isEditForm;
  }

  closeForm(): void {
    this.isEditForm = false;
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
 }
