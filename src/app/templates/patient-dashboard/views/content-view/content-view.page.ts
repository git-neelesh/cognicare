import { Component, OnInit } from '@angular/core';
import { Demo, courseSectionsList, demoList } from '../../models/demo-list';
import { randColor, randHex, randUser,randProductDescription, randSoonDate  } from '@ngneat/falso';
import { Router } from '@angular/router';
import { LangService } from 'src/app/lang.service';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.page.html',
  styleUrls: ['./content-view.page.scss'],
})
export class ContentViewPage implements OnInit {
  courses = demoList;
  courseSections = [{
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
  translateData: any
  constructor(private route: Router,
    private langService: LangService
  ) {
this.langService.makeRequest([{
      "text": "Patient Dashboard"
    }, {
      "text": "Your family"
    }, {
      "text": "You caring loved ones"
    }, {
      "text": "Caregivers"
    },{
      "text": "They will assists you with daily tasks and activities"
    },{
      "text": "Music you love"
    },{
      "text": "Rhythm and harmony find their way into the inward places of the Soul."
    }], localStorage.getItem('lang'), this.translateData).then((data: any) => {
      this.translateData = JSON.parse(data)
    })

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
