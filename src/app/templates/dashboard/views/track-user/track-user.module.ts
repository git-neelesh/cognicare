import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackUserPageRoutingModule } from './track-user-routing.module';

import { TrackUserPage } from './track-user.page';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

let socketIoConfig: SocketIoConfig = {
  url: 'hack-team-memory-makers.el.r.appspot.com/'
}; 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackUserPageRoutingModule,
    SocketIoModule.forRoot(socketIoConfig)
  ],
  declarations: [TrackUserPage]
})
export class TrackUserPageModule {}
