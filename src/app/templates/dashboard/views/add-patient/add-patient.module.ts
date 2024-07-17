import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPatientRoutingModule } from './add-patient-routing.module';

import { ShuffleArrayPipe } from '../../helper/shuffle-array/shuffle-array.pipe';
import { AddPatientComponent } from './add-patient.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPatientRoutingModule,
  ],
  // exports: [AddPatientComponent],
  declarations: [AddPatientComponent],
})
export class AddPatientModule {}
