import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CameraViewRoutingModule } from './camera-view-routing.module';
import { CameraViewComponent } from './camera-view.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CameraViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    CameraViewRoutingModule,
    IonicModule.forRoot(),
  ]
})
export class CameraViewModule { }