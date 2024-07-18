import { Component, OnInit } from '@angular/core';
import { Demo, courseSectionsList, demoList } from '../../models/demo-list';
import { randColor, randHex, randUser,randProductDescription, randSoonDate  } from '@ngneat/falso';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Share } from '@capacitor/share';
@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.page.html',
  styleUrls: ['./content-view.page.scss'],
})
export class ContentViewPage implements OnInit {
  courses = demoList;
  myImage = null;
  position: Position = null;
  courseSections = [{
    title: 'Games',
    caption: '4 Games',
    color: '#9CC5FF',
    image: 'assets/course_rive/game.png',
    route:'games'
  },{
    title: 'Music',
    caption: '10 Music list',
    color: '#6E6AE8',
    image: 'assets/course_rive/music.png',
    route:'music'

  },{
    title: 'Gallery',
    caption: '15 photos',
    color: '#005FE7',
    image: 'assets/course_rive/image-gallery.png',
    route:'gallery'

  }];
  color = ['#7676ab', '#059ab4', '#f03d81', '#064167', '#7b8b49', '#0aade4', '#0ffe0e', '#008d99', '#925fb1', '#445269']
  desc = randProductDescription({ length: 10 })
  dateInfo = randSoonDate()
  constructor(private route: Router) {
    console.log(randUser({length:10}), randHex({length:10}))
  }
async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    this.myImage = image.webPath;
  }
  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();

    this.position = coordinates;
  }

  async share() {
    await Share.share({
      title: 'Come and find me',
      text: `Here's my current location:
        ${this.position.coords.latitude},
        ${this.position.coords.longitude}`,
      url: 'http://ionicacademy.com/'
    });
  }
  ngOnInit() {}

  trackCourses(i: number, course: any) {
    return `${course.title}_${i}`;
  }

  trackAvatarItems(_i: number, num: number) {
    return `avatar_${num}`;
  }
  goto(route:string) {
    this.route.navigateByUrl(`/patient-dashboard/${route}`)
  }
}
