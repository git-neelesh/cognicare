import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AnimationController, Platform } from '@ionic/angular';
import initializeGame from 'src/game1';
import { Hangman } from 'src/game2';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss'],
})
export class GameViewComponent implements OnInit {
  constructor(public location: Location, public platform: Platform, private animationCtrl: AnimationController) { }

  gameSections: any = [
    {
      title: 'Games',
      caption: 'Guess the correct word',
      color: '#db38e5',
      image: 'assets/course_rive/game.png',
      id: 'G_1'
    },
    {
      title: 'Games',
      caption: 'Game 2',
      color: '#e6d65f',
      image: 'assets/course_rive/game.png',
      id: 'G_2'

    },
    {
      title: 'Games',
      caption: 'Symbol Match game',
      color: '#8682af',
      image: 'assets/course_rive/game.png',
      id: 'G_3'

    }
  ]
  activeGID: string = ''


  ngOnInit() { }
  activeGame(gID: string) {
    this.activeGID = gID
    setTimeout(() => {
      switch (this.activeGID) {
        case 'G_1':
          initializeGame()
          break;
        case 'G_2':
          Hangman.init()
          break;

        default:
          break;
      }
    }, 300);
  }


}
