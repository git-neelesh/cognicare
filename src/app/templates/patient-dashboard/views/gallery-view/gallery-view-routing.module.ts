import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryViewComponent } from './gallery-view.component';
import { RiveModule } from 'ng-rive';

const routes: Routes = [
   {
    path: '',
    component: GalleryViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,RiveModule]
})
export class GalleryViewRoutingModule { }
