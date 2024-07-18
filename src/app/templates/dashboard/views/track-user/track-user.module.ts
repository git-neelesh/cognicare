import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackUserPageRoutingModule } from './track-user-routing.module';

import { TrackUserPage } from './track-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackUserPageRoutingModule
  ],
  declarations: [TrackUserPage]
})
export class TrackUserPageModule {}
