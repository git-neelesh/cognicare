import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiveModule, RIVE_FOLDER } from 'ng-rive';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
  },
  {
    path: 'on-boarding',
    loadChildren: () =>
      import('./views/on-boarding/on-boarding.module').then(
        (m) => m.OnBoardingPageModule
      ),
  },
  {
    path: 'content-view',
    loadChildren: () =>
      import('./views/content-view/content-view.module').then(
        (m) => m.ContentViewPageModule
      ),
  },
  {
    path: 'games',
    loadChildren: () =>
      import('./views/game-view/game-view-routing.module').then(
        (m) => m.GameViewRoutingModule
      ),
  },
  {
    path: 'music',
    loadChildren: () =>
      import('./views/music-view/music-view-routing.module').then(
        (m) => m.MusicViewRoutingModule
      ),
  },
  {
    path: 'gallery',
    loadChildren: () =>
      import('./views/gallery-view/gallery-view-routing.module').then(
        (m) => m.GalleryViewRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), RiveModule],
  exports: [RouterModule, RiveModule],
  providers: [
    {
      provide: RIVE_FOLDER,
      useValue: 'assets/course_rive/rive',
    },
  ],
})
export class DashboardPageRoutingModule {}
