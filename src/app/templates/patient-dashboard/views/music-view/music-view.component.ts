import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { tabItemsList } from '../../models/tabs';

@Component({
  selector: 'app-music-view',
  templateUrl: './music-view.component.html',
  styleUrls: ['./music-view.component.scss'],
})
export class MusicViewComponent  implements OnInit {
  audio: HTMLAudioElement;
  isPlaying = false;
  selectedTab = tabItemsList[2];


  songs = [
    { title: 'Happiness', thumbnail: 'assets/icon/song1.png', audio: 'assets/music/happiness.mp3' },
    { title: 'Relaxing', thumbnail: 'assets/icon/song1.png', audio: 'assets/music/happiness.mp3' },
    { title: 'Meditation', thumbnail: 'assets/icon/song1.png', audio: 'assets/music/happiness.mp3' },
    { title: 'Feel Good', thumbnail: 'assets/icon/song1.png', audio: 'assets/music/happiness.mp3' },
    // Add more songs as needed
  ];
  currentSong: any = null;
  constructor(private audioService: AudioService, public location: Location) { }

  ngOnInit() {}

  playAudio(song: any) {
    // if(this.isPlaying) {
    //   this.stopAudio();
    // }
    // this.audioService.playAudio(url);
    this.currentSong = song;
    this.isPlaying = true;
  }

  pauseAudio() {
    this.audioService.pauseAudio();
    this.isPlaying = false;
  }

  stopAudio() {
    this.audioService.stopAudio();
    this.isPlaying = false;
  }
}
