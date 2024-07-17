import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CameraViewComponent } from './camera-view.component';
import { CameraViewRoutingModule } from './camera-view-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  exports: [CameraViewComponent],
  declarations: [CameraViewComponent],
  imports: [
    CommonModule,
    IonicModule,
    CameraViewRoutingModule,
    FormsModule
  ]
})
export class CameraViewModule { }
