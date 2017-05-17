import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { CreateAccount } from '../create-account/create-account';
import { ResetPassword } from '../reset-password/reset-password';
import { Tabs } from '../tabs/tabs';
import { UserService } from '../../providers/user-service';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserService],
})
export class Login {

  public emailField: any;
  public passwordField: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
              public userService: UserService, public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {

  }

  logIn() {
    console.log('User ' + this.emailField + ' try to log in with password ' + this.passwordField);
    this.userService.singIn(this.emailField, this.passwordField).then(authData => {
      this.navCtrl.setRoot(Tabs);
    }, error => {
      this.showAlert("Error al iniciar sesión!", error.message);
    });

    let loader = this.loadingCtrl.create({
      dismissOnPageChange: true
    });

    loader.present();
  }

  register() {
    let registerModal = this.modalCtrl.create(CreateAccount);
    registerModal.present();
  }

  ResetPassword() {
    let resetModal = this.modalCtrl.create(ResetPassword);
    resetModal.present();
  }

  showAlert(tittle: string, message:string) {
    let alert = this.alertCtrl.create({
      title: tittle,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
