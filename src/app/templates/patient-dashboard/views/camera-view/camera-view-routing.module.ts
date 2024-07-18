import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraViewComponent } from './camera-view.component';
import { RiveModule } from 'ng-rive';
const routes: Routes = [
{
  path: '',
  component: CameraViewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,RiveModule]
})
export class CameraViewRoutingModule { }
