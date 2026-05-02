import { ChangeDetectionStrategy, Component, EventEmitter } from '@angular/core';
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
  private _editingArticle: Article | null = null;
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

  @Input()
  set editingArticle(article: Article | null) {
    this._editingArticle = article;

    if (article) {
      this.form.patchValue({
        title: article.title,
        text: article.text,
      });
    }
  }

  get editingArticle(): Article | null {
    return this._editingArticle;
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
