import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryViewRoutingModule } from './gallery-view-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GalleryViewComponent } from './gallery-view.component';
import { BottomTabBarModule } from '../../navigation/bottom-tab-bar/bottom-tab-bar.module';


@NgModule({
  exports: [GalleryViewComponent],
  declarations: [GalleryViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryViewRoutingModule,
    BottomTabBarModule
  ]
})
export class GalleryViewModule { }
