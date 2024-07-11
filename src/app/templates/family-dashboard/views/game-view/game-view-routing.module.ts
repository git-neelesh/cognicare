import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameViewComponent } from './game-view.component';
import { RiveModule } from 'ng-rive';

const routes: Routes = [
   {
    path: '',
    component: GameViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,RiveModule]
})
export class GameViewRoutingModule { }
