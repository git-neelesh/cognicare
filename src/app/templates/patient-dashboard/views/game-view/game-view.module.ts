import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameViewRoutingModule } from './game-view-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GameViewComponent } from './game-view.component';
import { SymbolMatchGameComponent } from './symbol-match-game/symbol-match-game.component';


@NgModule({
  exports: [GameViewComponent,SymbolMatchGameComponent],
  declarations: [GameViewComponent,SymbolMatchGameComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameViewRoutingModule,
  ]
})
export class GameViewModule { }
