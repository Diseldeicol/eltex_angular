import { ChangeDetectionStrategy, Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-statictic-dialog',
  imports: [],
  templateUrl: './statistic-dialog.html',
  styleUrl: './statistic-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticDialog {
  @Output() onCloseEvent = new EventEmitter<void>();
  @Input() articleCount: number = 0;
  onClose(): void{

    this.onCloseEvent.emit();
  }
}
