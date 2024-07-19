import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AnimationController, Platform } from '@ionic/angular';
import initializeGame from 'src/game1';
import { Hangman } from 'src/game2';
import { tabItemsList } from '../../models/tabs';

@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.scss'],
})
export class GalleryViewComponent  implements OnInit {
  selectedTab = tabItemsList[3];

  constructor(public location: Location, public platform: Platform, private animationCtrl: AnimationController) { }

  familySections: any = [
    {
      title: 'Carle',
      caption: 'Grand Daughter',
      color: '#9CC5FF',
      image: 'assets/course_rive/avatars/boy.jpeg',
      id: 'G_1'
    },
    {
      title: 'Rebecca',
      caption: 'Daughter',
      color: '#e6d65f',
      image: 'assets/course_rive/avatars/girl.jpeg',
      id: 'G_2'

    },
    {
      title: 'John',
      caption: 'Son',
      color: '#8682af',
      image: 'assets/course_rive/avatars/boy.jpeg',
      id: 'G_3'

    },
    {
      title: 'Rebecca',
      caption: 'Daughter',
      color: '#9CC5FF',
      image: 'assets/course_rive/avatars/girl.jpeg',
      id: 'G_2'

    },
  ]
  activeGID: string = ''


  ngOnInit() { }
}
