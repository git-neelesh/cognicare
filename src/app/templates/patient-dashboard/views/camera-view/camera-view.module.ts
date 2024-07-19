import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraViewRoutingModule } from './camera-view-routing.module';
import { CameraViewComponent } from './camera-view.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { BottomTabBarModule } from '../../navigation/bottom-tab-bar/bottom-tab-bar.module';

@NgModule({
  declarations: [CameraViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    CameraViewRoutingModule,
    IonicModule.forRoot(),
    HttpClientModule,
    BottomTabBarModule
  ]
})
export class CameraViewModule { }