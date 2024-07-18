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
    { title: 'Song 1', thumbnail: 'assets/icon/song1.png', audio: 'http://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { title: 'Song 2', thumbnail: 'assets/icon/song1.png', audio: 'http://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' }
    // Add more songs as needed
  ];
  currentSong: any = null;
  constructor(private audioService: AudioService, public location: Location) { }

  ngOnInit() {}

  playAudio(song: any) {
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
  

  // togglePlay() {
  //   if (this.isPlaying) {
  //     this.audio.pause();
  //   } else {
  //     this.audio.play();
  //   }
  //   this.isPlaying = !this.isPlaying;
  // }

}
