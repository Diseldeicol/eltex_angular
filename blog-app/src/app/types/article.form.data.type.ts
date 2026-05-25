export type ArticleFormData = {
  title: string;
  text: string;
  image?: File | null;
  categoryId?: string | null;
  categoryName?: string | null;
};