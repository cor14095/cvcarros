import { Component } from '@angular/core';
import { UserService } from '../../providers/user-service';
import { Login } from '../login/login';
import { VehicleInfoPage } from '../vehicle-info/vehicle-info';
import { AdvancedSearch } from '../advanced-search/advanced-search';
import { NavController, ViewController, AlertController, LoadingController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UserService],
})
export class HomePage {

  public dispName: any;
  public cars = [];

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
    public alertCtrl: AlertController, public userService: UserService,
    public loadingCtrl: LoadingController, public platform: Platform) {

      this.dispName = this.userService.getDisplayName();
  }

  ionViewDidEnter() {
    //console.log('ionViewDidEnter HomePage');
    this.cars = [];
    this.loadCars();
  }

  detailView(car: any){
    this.navCtrl.push(VehicleInfoPage, {car: car});
    //console.log(car);
  }

  advanceSearch() {
    this.navCtrl.push(AdvancedSearch);
  }

  loadCars() {
    var test = this;
    this.userService.getCars().then(function(object) {
      // Iterate for each post.
      for (let key in object) {
        //console.log(key + "->" + object[key]);
        test.cars.push(object[key]);
      };
      //console.log (test.cars);
    })
  }

  priceCheck(price) {
    if (price > 0) {
      return "arrow-round-down";
    } else {
      return "arrow-round-up";
    };
  }

  logOut() {
    this.userService.logOutUser();
    this.navCtrl.setRoot(Login);
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

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Cerrar sesión?',
      message: 'Esta seguro que desea cerrar su sesión?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log('Agree clicked');
            this.logOut();
          }
        }
      ]
    });
    confirm.present();
  }

}
