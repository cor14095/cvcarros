import { Component } from '@angular/core';
import { UserService } from '../../providers/user-service';
import { Login } from '../login/login';
import { NavController, ViewController, AlertController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UserService],
})
export class HomePage {

  public dispName: any;
  public myInput: any;

  public cars = [];

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
    public alertCtrl: AlertController, public userService: UserService,
    public loadingCtrl: LoadingController) {

      this.dispName = this.userService.getDisplayName();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.loadCars();
  }

  loadCars() {
    var test = this;
    this.userService.getCars().then(function(object) {
      // Iterate for each post.
      for (let key in object) {
        console.log(key + "->" + object[key]);
        var car = [];
        test.cars.push(object[key]);
        // Iterate for each value in a post.
        for (let post in object[key]) {
          //console.log(object[key][post]);
          car.push(object[key][post]);
        };
      };
      console.log (test.cars);
    })
  }

  logOut() {
    this.userService.logOutUser();

    this.navCtrl.setRoot(Login);
  }

  search() {

  }

  onCancel() {
    this.myInput = "";
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
