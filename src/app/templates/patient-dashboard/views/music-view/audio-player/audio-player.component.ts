import { Component, OnInit, ElementRef, ViewChildren, QueryList, Input, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-audio-player',
    templateUrl: './audio-player.component.html'
})
export class AudioPlayerComponent implements OnInit, AfterViewInit {
    @Input() sources: { src: string }[] = [];

    @ViewChildren('player') playerElementsRef: QueryList<ElementRef>;

    isPlaying = new Array<boolean>();
    isLoading = new Array<boolean>();
    currentTime = new Array<number>();
    duration = new Array<number>();

    private _players: HTMLAudioElement[] = [];

    constructor() { }

    ngOnInit() {
        this.sources.forEach((_, index) => {
            this.isPlaying[index] = false;
            this.isLoading[index] = false;
            this.currentTime[index] = 0;
            this.duration[index] = 0;
        });
    }

    ngAfterViewInit(): void {
        this.playerElementsRef.forEach((playerElementRef, index) => {
            this._players[index] = playerElementRef.nativeElement;
            this._bindPlayerEvents(index);
        });
    }

    play(index: number): void {
        this._players[index].paused ? this._players[index].play() : this._players[index].pause();
    }

    seek(event: any, index: number): void {
        this._players[index].currentTime = event.detail.value;
    }

    private _bindPlayerEvents(index: number): void {
        const player = this._players[index];

        player.addEventListener('playing', () => {
            this.isPlaying[index] = true;
        });

        player.addEventListener('pause', () => {
            this.isPlaying[index] = false;
        });

        player.addEventListener('timeupdate', () => {
            this.currentTime[index] = Math.floor(player.currentTime);
        });

        player.addEventListener('seeking', () => {
            this.isLoading[index] = true;
        });

        player.addEventListener('seeked', () => {
            this.isLoading[index] = false;
        });

        player.addEventListener('loadstart', () => {
            this.isLoading[index] = true;
        });

        player.addEventListener('loadeddata', () => {
            this.isLoading[index] = false;
            this.duration[index] = Math.floor(player.duration);
        });
    }
}

