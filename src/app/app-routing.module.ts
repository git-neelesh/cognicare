import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./templates/dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./templates/dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
  },
  {
    path: 'patient-dashboard',
    loadChildren: () =>
      import('./templates/patient-dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
  },
  {
    path: 'family-dashboard',
    loadChildren: () =>
      import('./templates/family-dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,useHash:true }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
