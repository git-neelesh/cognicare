import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicViewRoutingModule } from './music-view-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MusicViewComponent } from './music-view.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
// import { BottomTabBarComponent } from '../../navigation/bottom-tab-bar/bottom-tab-bar.component';
import { BottomTabBarModule } from '../../navigation/bottom-tab-bar/bottom-tab-bar.module';


@NgModule({
  exports: [MusicViewComponent, AudioPlayerComponent],
  declarations: [MusicViewComponent, AudioPlayerComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    MusicViewRoutingModule,
    BottomTabBarModule
  ],
})
export class MusicViewModule { }
