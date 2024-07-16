
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CallAnyNumber } from './components/call-any-number';

@NgModule({
    imports: [NgModule, CommonModule, FormsModule, IonicModule],
    declarations: [CallAnyNumber],
    exports:[CallAnyNumber]

})
export class SharedModule {}