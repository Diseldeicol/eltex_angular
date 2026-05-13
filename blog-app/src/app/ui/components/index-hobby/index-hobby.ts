import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-index-hobby',
  imports: [],
  templateUrl: './index-hobby.html',
  styleUrl: './index-hobby.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexHobby {
  protected readonly myHobbies = [
    {
      id: 1,
      imgUrl:"images/img1.png",
      imgAlt: "Хобби 1",
      projectName: "Hobby project name",
      description: "Duis nisi do exercitation in irure aliqua commodo nisi eu id reprehenderit dolore fugiat consectetur irure labore est ea.",
    },
    {
      id: 2,
      imgUrl:"images/img2.png",
      imgAlt: "Хобби 2",
      projectName: "Hobby project name",
      description: "Duis nisi do exercitation in irure aliqua commodo nisi eu id reprehenderit dolore fugiat consectetur irure labore est ea.",
    },
    {
      id: 3,
      imgUrl:"images/noname_photo.png",
      imgAlt: "Хобби 3",
      projectName: "Hobby project name",
      description: "Duis nisi do exercitation in irure aliqua commodo nisi eu id reprehenderit dolore fugiat consectetur irure labore est ea.",
    },
    {
      id: 4,
      imgUrl:"images/noname_photo.png",
      imgAlt: "Хобби 4",
      projectName: "Hobby project name",
      description: "Duis nisi do exercitation in irure aliqua commodo nisi eu id reprehenderit dolore fugiat consectetur irure labore est ea.",
    },
  ]
 }
