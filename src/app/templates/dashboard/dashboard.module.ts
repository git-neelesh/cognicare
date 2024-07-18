import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { SideMenuComponent } from './navigation/side-menu/side-menu.component';
import { BottomTabBarComponent } from './navigation/bottom-tab-bar/bottom-tab-bar.component';
import { OnBoardingPageModule } from './views/on-boarding/on-boarding.module';
import { ContentViewPageModule } from './views/content-view/content-view.module';
import { MenuRowComponent } from './navigation/side-menu/menu-row/menu-row.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AddPatientModule } from './views/add-patient/add-patient.module';

let socketIoConfig: SocketIoConfig = {
  url: 'https://aab6-160-83-96-177.ngrok-free.app/socket.io/socket.io.js'
}; 


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    OnBoardingPageModule,
    ContentViewPageModule,
    AddPatientModule,
    SocketIoModule.forRoot(socketIoConfig)
  ],
  declarations: [
    DashboardPage,
    SideMenuComponent,
    MenuRowComponent,
    BottomTabBarComponent
  ],
})
export class DashboardPageModule {}
