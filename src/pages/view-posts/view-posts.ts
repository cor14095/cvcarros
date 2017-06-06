import { Component } from '@angular/core';
import { UserService } from '../../providers/user-service';
import { VehicleInfoPage } from '../vehicle-info/vehicle-info';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-view-posts',
  templateUrl: 'view-posts.html',
})
export class ViewPostsPage {

  public cars = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userService: UserService) {
  }

  ionViewWillEnter() {
    this.loadCars();
  }

  loadCars() {
    var test = this;
    this.userService.getCarsUser().then(function(object) {
      // Iterate for each post.
      for (let key in object) {
        test.cars.push(object[key]);
      };
    })
  }

  priceCheck(price) {
    if (price > 0) {
      return "arrow-round-down";
    } else {
      return "arrow-round-up";
    };
  }

  colorCheck(price) {
    if (price > 0) {
      return "down";
    } else {
      return "up";
    };
  }

  detailView(car: any){
    this.navCtrl.push(VehicleInfoPage, {car: car});
  }
}
