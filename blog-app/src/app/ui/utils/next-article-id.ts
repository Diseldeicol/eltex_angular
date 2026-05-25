import type { Article } from '../../types/article.type';

export function getNextArticleId(articles: Article[]): string {
  if (articles.length === 0) {
    return '1';
  }

  const numericIds = articles
    .map((article) => Number(article.id))
    .filter((id) => Number.isFinite(id));

  if (numericIds.length === 0) {
    return String(Date.now());
  }

  const maxId = Math.max(...numericIds);

  return String(maxId + 1);
}