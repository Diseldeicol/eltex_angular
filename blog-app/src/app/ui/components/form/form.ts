import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Output,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule,  type MatAutocompleteSelectedEvent, } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { startWith } from 'rxjs';

import { CategoriesService } from '../../../services/categories/categories.service';
import type { ArticleFormData } from '../../../types/article.form.data.type';
import type { Article } from '../../../types/article.type';
import type { Category } from '../../../types/category.type';

@Component({
  selector: 'app-form',
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {
  public editingArticle = input<Article | null>(null);

  @Output() public readonly onCancelEvent = new EventEmitter<void>();
  @Output() public readonly onSaveEvent = new EventEmitter<ArticleFormData>();

  private readonly categoriesService = inject(CategoriesService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly selectedImage = signal<File | null>(null);
  protected readonly categories = signal<Category[]>([]);

  protected readonly form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(25)],
    }),
    text: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    categoryName: new FormControl('', {
      nonNullable: true,
    }),
  });

  private readonly categoryQuery = toSignal(
    this.form.controls.categoryName.valueChanges.pipe(
      startWith(this.form.controls.categoryName.value),
    ),
    { initialValue: '' },
  );

  protected readonly formTitle = computed(() =>
    this.editingArticle() ? 'Редактировать статью' : 'Добавить статью',
  );

  protected readonly saveButtonLabel = computed(() =>
    this.editingArticle() ? 'Сохранить' : 'Добавить',
  );

  protected readonly categoryNameValue = computed(() =>
    this.categoryQuery().trim(),
  );

  protected readonly filteredCategories = computed(() => {
    const query = this.categoryNameValue().toLowerCase();

    const sortedCategories = [...this.categories()].sort((firstCategory, secondCategory) =>
      firstCategory.name.localeCompare(secondCategory.name, 'ru'),
    );

    if (!query) {
      return sortedCategories;
    }

    return sortedCategories.filter((category) =>
      category.name.toLowerCase().includes(query),
    );
  });

  protected readonly hasExactCategory = computed(() => {
    const query = this.categoryNameValue().toLowerCase();

    if (!query) {
      return true;
    }

    return this.categories().some(
      (category) => category.name.toLowerCase() === query,
    );
  });

  protected readonly selectedImageName = computed(() => {
    const selectedImage = this.selectedImage();

    if (selectedImage) {
      return selectedImage.name;
    }

    return this.editingArticle()
      ? 'Текущее изображение сохранено'
      : 'Файл не выбран';
  });

  constructor() {
    this.loadCategories();
    this.fillFormWithEditingArticle();
  }

  protected onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.selectedImage.set(file);
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();

    this.onSaveEvent.emit({
      title: formValue.title.trim(),
      text: formValue.text.trim(),
      categoryName: formValue.categoryName.trim() || null,
      image: this.selectedImage(),
    });
  }

  protected onCancel(): void {
    this.onCancelEvent.emit();
    this.resetAfterClose();
  }

  private loadCategories(): void {
    this.categoriesService
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((categories) => {
        this.categories.set(categories);
        this.patchCategoryForEditing();
      });
  }

  private fillFormWithEditingArticle(): void {
    effect(() => {
      const editData = this.editingArticle();

      if (!editData) {
        this.form.reset();
        this.selectedImage.set(null);
        return;
      }

      this.form.patchValue({
        title: editData.title,
        text: editData.text,
        categoryName: editData.categoryName ?? '',
      });

      this.patchCategoryForEditing();
    });
  }

  private resetAfterClose(): void {
    setTimeout(() => {
      this.form.reset();
      this.selectedImage.set(null);
    }, 250);
  }

  private patchCategoryForEditing(): void {
    const editData = this.editingArticle();

    if (!editData) {
      return;
    }

    if (editData.categoryName) {
      this.form.patchValue({
        categoryName: editData.categoryName,
      });

      return;
    }

    if (!editData.categoryId) {
      return;
    }

    const category = this.categories().find(
      (item) => item.id === editData.categoryId,
    );

    if (!category) {
      return;
    }

    this.form.patchValue({
      categoryName: category.name,
    });
  }
}