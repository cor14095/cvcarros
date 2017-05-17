import { Component } from '@angular/core';
import { UserService } from '../../providers/user-service';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VehicleInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vehicle-info',
  templateUrl: 'vehicle-info.html',
  providers: [UserService],
})
export class VehicleInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userService: UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehicleInfoPage');
  }

}
