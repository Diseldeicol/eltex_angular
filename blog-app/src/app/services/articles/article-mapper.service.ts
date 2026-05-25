import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import type { Article } from '../../types/article.type';
import type { ArticleFormData } from '../../types/article.form.data.type';
import type { BackendArticle } from '../../types/backend-article.type';

@Injectable({ providedIn: 'root' })
export class ArticleMapperService {
  public toArticle(dto: BackendArticle): Article {
    return {
      id: dto.id,
      title: dto.title,
      text: dto.content,
      date: dto.createdAt,
      imageUrl: dto.imgSrc
        ? `${environment.fileBaseUrl}${dto.imgSrc}`
        : environment.mockImageUrl,
      rating: dto.rating ?? 0,
      categoryId: dto.categoryId ?? null,
      categoryName: dto.category?.name ?? null,
    };
  }

  public toFormData(article: ArticleFormData): FormData {
    const formData = new FormData();

    formData.append('title', article.title);
    formData.append('content', article.text);

    if (article.categoryId !== null && article.categoryId !== undefined) {
    formData.append('categoryId', article.categoryId);
    }

    if (article.image) {
      formData.append('image', article.image);
    }

    return formData;
  }
}