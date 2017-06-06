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
    this.cars = [];
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

  search(ev: any) {
    try {
      var test = this;
      if (ev.target.value == undefined || ev.target.value == " ") {
        ev.target.value = ""
      }
      var values = ev.target.value.split(" ");
      this.cars = [];
      this.userService.getCars().then(function(object) {
        // Iterate for each post.
        for (let key in object) {
          // Check if ev match any key word:
          for (let value of values) {
            if (object[key]["brand"].toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                object[key]["model"].toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                object[key]["year"].toString().indexOf(value) !== -1 ||
                object[key]["price"].toString().indexOf(value) !== -1) {
                    test.cars.push(object[key]);
                }
          };
        };
        //console.log(test.cars);
        return test.cars;
      });
    } catch (exception) {
      console.log(exception.message);
    }
  }
}
