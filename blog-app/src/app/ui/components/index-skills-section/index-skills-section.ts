import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-index-skills-section',
  imports: [],
  templateUrl: './index-skills-section.html',
  styleUrl: './index-skills-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexSkillsSection { 
  protected readonly skills = [
    'Python',
    'JavaScript',
    'HTML5',
    'Git',
    'Figma',
    'VS Code',
    'CSS',
    'Angular',
  ];
}
