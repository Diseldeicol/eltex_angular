import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-index-my-work',
  imports: [],
  templateUrl: './index-my-work.html',
  styleUrl: './index-my-work.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexMyWork {
  protected readonly workExperience = [
    {
      id: 1,
      imageUrl: 'images/work1.png',
      imageAlt: 'Фотография',
      period: '2023-2024',
      position: 'Специалист разметки данных для Алисы, компания "Ancor"',
      description:
        'Подготовка, структурирование и классификация массивов информации, необходимых для обучения голосового помощника.',
    },
    {
      id: 2,
      imageUrl: 'images/work2.png',
      imageAlt: 'Фотография',
      period: '2024-2025',
      position: 'Преподаватель, международная школа программирования Алгоритмика',
      description:
        'Проведение занятий по языкам Python и Scratch, разработка и адаптация учебных материалов, обучение школьников основам алгоритмического мышления и программирования, сопровождение учебного процесса.',
    },
    {
      id: 3,
      imageUrl: 'images/work3.png',
      imageAlt: 'Фотография',
      period: '2025-2026',
      position: 'Инженер технической поддержки и мониторинга, ООО "КОРТЭЛ"',
      description:
        'Прием и регистрации обращений, мониторинг, регистрация, решение и эскалация аварийных ситуаций, ведение деловой переписки с клиентами, ведение базы знаний.',
    },
  ];
 }
