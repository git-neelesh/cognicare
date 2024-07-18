import { Component, OnInit } from '@angular/core';
import { Demo, courseSectionsList, demoList } from '../../models/demo-list';
import { randColor, randHex, randUser,randProductDescription, randSoonDate  } from '@ngneat/falso';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.page.html',
  styleUrls: ['./content-view.page.scss'],
})
export class ContentViewPage implements OnInit {
  courses = demoList;
  courseSections = [{
    title: 'FaceScan',
    caption: 'Do you know them?',
    color: '#005FE7',
    image: 'assets/course_rive/image-gallery.png',
    route:'camera'

  },{
    title: 'Games',
    caption: '4 Games',
    color: '#9CC5FF',
    image: 'assets/course_rive/game.png',
    route:'games'
  },{
    title: 'Music',
    caption: 'Music List',
    color: '#6E6AE8',
    image: 'assets/course_rive/music.png',
    route:'music'

  },{
    title: 'My Family',
    caption: '3 members',
    color: '#005FE7',
    image: 'assets/course_rive/image-gallery.png',
    route:'family'

  }];
  color = ['#7676ab', '#059ab4', '#f03d81', '#064167', '#7b8b49', '#0aade4', '#0ffe0e', '#008d99', '#925fb1', '#445269']
  desc = randProductDescription({ length: 10 })
  dateInfo = randSoonDate()
  constructor(private route: Router) {
    console.log(randUser({length:10}), randHex({length:10}))

  }

  async ngOnInit() {


  }

  trackCourses(i: number, course: any) {
    return `${course.title}_${i}`;
  }

  trackAvatarItems(_i: number, num: number) {
    return `avatar_${num}`;
  }

  goToRoutes(course) {
    if(course.title === "Your family"){
      this.route.navigate(['patient-dashboard/family']);
    }
  }
  goto(route:string) {
    this.route.navigateByUrl(`/patient-dashboard/${route}`)
  }
  gotoGallery(){
    console.log('##### gallery')
  }
}
