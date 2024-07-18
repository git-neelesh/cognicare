import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { BottomTabBarComponent } from './bottom-tab-bar.component';
import { RiveModule, RIVE_FOLDER } from 'ng-rive';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RiveModule
  ],
  exports: [BottomTabBarComponent],
  declarations: [BottomTabBarComponent],
})
export class BottomTabBarModule { }
