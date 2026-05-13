import type { Article } from '../../types/article.type';

export function getNextArticleId(articles: Article[]): number {
  if (articles.length === 0) {
    return 1;
  }

  const maxId = Math.max(...articles.map((article) => article.id));

  return maxId + 1;
}
