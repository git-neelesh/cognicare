import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BottomTabItem, tabItemsList } from '../../models/tabs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'cr-bottom-tab-bar',
  templateUrl: './bottom-tab-bar.component.html',
  styleUrls: ['./bottom-tab-bar.component.scss'],
})
export class BottomTabBarComponent implements OnInit, OnChanges {
  tabItems = tabItemsList;
  @Input() selectedTab: BottomTabItem = this.tabItems[0];
  @Output() onTabChange = new EventEmitter<BottomTabItem>();

  constructor(private route: Router, private auth: AuthService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
    }
  }

  ngOnInit() {
    // Temporary solution to fix the rive asset loading issue causing "Binding Error",
    // which fails for most if rendered together, so This will load them all with a delay,
    for (let i = 0; i < this.tabItems.length; i++) {
      setTimeout(() => (this.tabItems[i].show = true), 1000);
    }
  }

  onIconPress(tab: BottomTabItem) {
    if (this.selectedTab !== tab) {
      tab.status = true;
      setTimeout(() => {
        tab.status = false;
      }, 1000);
      this.tabChange(tab);
    }
  }

  tabChange(event: any) {
    if(event.id === 'tab_logout') {
      this.auth.logout();
      return
    }
    if (!!event.route) {
      this.route.navigate([event.route]);
    } else {
      this.onTabChange.emit(event);
    }
  }

  trackTabItems(_i: number, tab: BottomTabItem) {
    return tab.id;
  }
}
