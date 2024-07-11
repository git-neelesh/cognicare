import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicViewRoutingModule } from './music-view-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MusicViewComponent } from './music-view.component';


@NgModule({
  declarations: [MusicViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicViewRoutingModule
  ]
})
export class MusicViewModule { }
