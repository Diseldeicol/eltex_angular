import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, of, switchMap, type Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import type { Category } from '../../types/category.type';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/categories`;
  private readonly storageKey = 'article-categories';

  public getCategories(): Observable<Category[]> {
    if (!environment.useBackendApi) {
      return of(this.getCategoriesFromStorage());
    }

    return this.http.get<Category[]>(this.apiUrl);
  }

  public createCategory(name: string): Observable<Category> {
    if (!environment.useBackendApi) {
        const categories = this.getCategoriesFromStorage();

        const normalizedName = name.trim();
        const existingCategory = categories.find(
        (category) => category.name.toLowerCase() === normalizedName.toLowerCase(),
        );

        if (existingCategory) {
        return of(existingCategory);
        }

        const newCategory: Category = {
        id: String(Date.now()),
        name: normalizedName,
        };

        const updatedCategories = [...categories, newCategory];
        localStorage.setItem(this.storageKey, JSON.stringify(updatedCategories));

        return of(newCategory);
    }

    return this.http.post<Category>(this.apiUrl, { name: name.trim() });
    }

  public ensureCategory(name?: string | null): Observable<Category | null> {
    const categoryName = name?.trim();

    if (!categoryName) {
      return of(null);
    }

    return this.getCategories().pipe(
      switchMap((categories) => {
        const existingCategory = categories.find(
          (category) => category.name.toLowerCase() === categoryName.toLowerCase(),
        );

        if (existingCategory) {
          return of(existingCategory);
        }

        return this.createCategory(categoryName);
      }),
    );
  }

  private getCategoriesFromStorage(): Category[] {
    const categoriesJson = localStorage.getItem(this.storageKey);

    if (!categoriesJson) {
        return [];
    }

    try {
        return JSON.parse(categoriesJson) as Category[];
    } catch {
        return [];
    }
    }
}