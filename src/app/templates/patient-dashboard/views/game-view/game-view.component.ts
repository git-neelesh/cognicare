import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AnimationController, Platform } from '@ionic/angular';
import initializeGame from 'src/game1';
import { Hangman } from 'src/game2';
import { tabItemsList } from '../../models/tabs';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss'],
})
export class GameViewComponent implements OnInit {
  constructor(public location: Location, public platform: Platform, private animationCtrl: AnimationController) { }

  selectedTab = tabItemsList[3];
  gameSections: any = [
    {
      title: 'Guess the word',
      caption: 'Guess the correct word',
      color: '#9CC5FF',
      image: 'assets/games/guess-the-word.jpeg',
      id: 'G_1'
    },    
    {
      title: 'Symbol matching',
      caption: 'Match the symbols',
      color: '#e6d65f',
      image: 'assets/games/match-icons.jpeg',
      id: 'G_3'

    },
    {
      title: 'Match the word',
      caption: 'Matching words',
      color: '#8682af',
      image: 'assets/games/crossword.jpeg',
      id: 'G_2'

    },
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
