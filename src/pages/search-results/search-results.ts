import { Component } from '@angular/core';
import { VehicleInfoPage } from '../vehicle-info/vehicle-info';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html',
})
export class SearchResults {

  public cars: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cars = this.navParams.get('cars');
  }

  priceCheck(price) {
    if (price > 0) {
      return "arrow-round-down";
    } else {
      return "arrow-round-up";
    };
  }

  detailView(car: any){
    this.navCtrl.push(VehicleInfoPage, {car: car});
    //console.log(car);
  }

}
