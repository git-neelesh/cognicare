import { Component, OnInit } from '@angular/core';
import { Demo, courseSectionsList, demoList } from '../../models/demo-list';
import { randColor, randHex, randUser,randProductDescription, randSoonDate  } from '@ngneat/falso';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.page.html',
  styleUrls: ['./content-view.page.scss'],
})
export class ContentViewPage implements OnInit {
  courses = demoList;
  courseSections = randUser({length:10});
  color = ['#7676ab', '#059ab4', '#f03d81', '#064167', '#7b8b49', '#0aade4', '#0ffe0e', '#008d99', '#925fb1', '#445269']
  desc = randProductDescription({ length: 10 })
  dateInfo = randSoonDate()
  constructor() {
    console.log(randUser({length:10}), randHex({length:10}))
  }

  ngOnInit() {}

  trackCourses(i: number, course: any) {
    return `${course.title}_${i}`;
  }

  trackAvatarItems(_i: number, num: number) {
    return `avatar_${num}`;
  }
}
