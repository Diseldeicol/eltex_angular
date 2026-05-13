import { ChangeDetectionStrategy, Component, EventEmitter, input, computed, effect } from '@angular/core';
import { Input,Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Article } from '../../../types/article.type';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form { 
  public editingArticle= input<Article|null>(null);
  protected form = new FormGroup({
    title: new FormControl("",{
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(25),],
    }), 
    text: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
  })
  protected formTitle = computed(() => 
    this.editingArticle() ? 'Редактировать статью' : 'Добавить статью'
  );
  protected saveButtonLabel = computed(() => 
    this.editingArticle() ? 'Сохранить' : 'Добавить'
  );

  constructor() {
    this.editDataEffect();
  }

  private editDataEffect(): void {
    effect(() => {
      const editData = this.editingArticle();

      if (editData) {
        this.form.patchValue(
          { title: editData.title, text: editData.text });
      } else {
        this.form.reset();
      }
    });
  } 
  
  @Output() onCancelEvent = new EventEmitter<void>();
  @Output() onSaveEvent = new EventEmitter<Pick<Article, 'title' | 'text'>>();
  private resetAfterClose(): void {
    setTimeout(() => {
      this.form.reset();
    }, 250);
  }
  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.onSaveEvent.emit(this.form.getRawValue());
    this.resetAfterClose();
  }

  onCancel(): void{
    this.onCancelEvent.emit();
    this.resetAfterClose();
  }
}
