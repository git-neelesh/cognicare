import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserDetailsPageRoutingModule } from './user-details-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { UserDetailsPage } from './user-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDetailsPageRoutingModule, NgChartsModule
  ],
  declarations: [UserDetailsPage]
})
export class UserDetailsPageModule {}
