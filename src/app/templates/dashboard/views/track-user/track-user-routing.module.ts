import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackUserPage } from './track-user.page';

const routes: Routes = [
  {
    path: '',
    component: TrackUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackUserPageRoutingModule {}
