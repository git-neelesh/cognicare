import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameViewRoutingModule } from './game-view-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GameViewComponent } from './game-view.component';


@NgModule({
  exports: [GameViewComponent],
  declarations: [GameViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameViewRoutingModule,
  ]
})
export class GameViewModule { }
