import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicViewComponent } from './music-view.component';
import { RiveModule } from 'ng-rive';

const routes: Routes = [
   {
    path: '',
    component: MusicViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, RiveModule]
})
export class MusicViewRoutingModule { }
