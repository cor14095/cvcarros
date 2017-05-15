import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { Profile } from '../profile/profile';
import { PostVehicle } from '../post-vehicle/post-vehicle';

@Component({
  templateUrl: 'tabs.html',
})
export class Tabs {

  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = Profile;
  tab3Root: any = PostVehicle;

  constructor() {
  }

}
