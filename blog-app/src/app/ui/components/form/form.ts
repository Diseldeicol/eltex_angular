import { ChangeDetectionStrategy, Component, EventEmitter } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'app-form',
  imports: [],
  templateUrl: './form.html',
  styleUrl: './form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form { 
  @Output() onCancelEvent = new EventEmitter<string>();

  onCancel(): void{
    this.onCancelEvent.emit();
  }
}
