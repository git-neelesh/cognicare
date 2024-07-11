import { Component, OnInit } from '@angular/core';
import { demoList } from '../../models/demo-list';
import { randHex, randUser,randProductDescription, randSoonDate  } from '@ngneat/falso';
import { Router, NavigationExtras } from '@angular/router';

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
  constructor(private route: Router) {
    console.log(randUser({length:10}), randHex({length:10}))
  }

  ngOnInit() {}

  openPatientDetails(patient: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        patient: patient
      }
    };
    this.route.navigate([`/patient-details`, patient.firstName], navigationExtras);
  }

  trackCourses(i: number, course: any) {
    return `${course.title}_${i}`;
  }

  trackAvatarItems(_i: number, num: number) {
    return `avatar_${num}`;
  }
}
