import type { Article } from './article.type';
import type { ArticleComment } from './article.comment.type';

export type PostDetailsResponse = {
  article: Article | null;
  comments: ArticleComment[];
};