import { Component } from '@angular/core';
import { UserService } from '../../providers/user-service';
import { Login } from '../login/login';
import * as firebase from 'firebase';
import { NavController, ViewController, AlertController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UserService],
})
export class HomePage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
    public alertCtrl: AlertController, public userService: UserService,
    public loadingCtrl: LoadingController) {

  }

  logOut() {
    this.userService.logOutUser();

    this.navCtrl.setRoot(Login);
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
