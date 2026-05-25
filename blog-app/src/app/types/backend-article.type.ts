export type BackendCategory = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BackendArticle = {
  id: string;
  title: string;
  content: string;
  imgSrc?: string | null;
  categoryId?: string | null;
  category?: BackendCategory | null;
  rating: number;
  createdAt: string;
  updatedAt: string;
};

export type BackendArticlesResponse = {
  items: BackendArticle[];
  total: number;
  page: number;
  limit: number;
};