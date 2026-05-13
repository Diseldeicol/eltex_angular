import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index-about-me-section',
  imports: [RouterLink],
  templateUrl: './index-about-me-section.html',
  styleUrl: './index-about-me-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexAboutMeSection { }
