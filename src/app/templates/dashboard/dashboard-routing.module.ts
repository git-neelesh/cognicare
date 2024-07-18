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
    path: 'patient-details/:id',
    loadChildren:() => import('./views/user-details/user-details.module').then(
      (m) => m.UserDetailsPageModule
    )
  },
  {
    path: 'add-patient',
    loadChildren:() => import('./views/add-patient/add-patient.module').then(
      (m) => m.AddPatientModule
    )
  },
  {
    path: 'track-user/:id',
    loadChildren: () => import('./views/track-user/track-user.module').then( m => m.TrackUserPageModule)
  }
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
