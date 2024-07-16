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
import { GameViewModule } from './views/game-view/game-view.module';
import { GalleryViewModule } from './views/gallery-view/gallery-view.module';
import { ChatbotComponent } from 'src/app/chatbot/chatbot.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    OnBoardingPageModule,
    ContentViewPageModule,
    GameViewModule,
    GalleryViewModule
  ],
  declarations: [
    DashboardPage,
    SideMenuComponent,
    MenuRowComponent,
    BottomTabBarComponent,
  ],
})
export class DashboardPageModule {}
