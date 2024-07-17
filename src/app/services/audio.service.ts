import { Injectable } from '@angular/core';
declare var Media: any;

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private media: any;

  constructor() { }

  playAudio(url: string) {
    if (this.media) {
      this.media.release();
    }
    this.media = new Media(url);
    this.media.play();
  }

  pauseAudio() {
    if (this.media) {
      this.media.pause();
    }
  }

  stopAudio() {
    if (this.media) {
      this.media.stop();
      this.media.release();
    }
  }
}
