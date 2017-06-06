import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { CreateAccount } from '../create-account/create-account';
import { ResetPassword } from '../reset-password/reset-password';
import { Tabs } from '../tabs/tabs';
import { UserService } from '../../providers/user-service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserService],
})
export class Login {

  public emailField: any;
  public passwordField: any;
  public tabBarElement: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
              public userService: UserService, public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

  }

  ionViewWillEnter(){
    if(this.tabBarElement != null)
      this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave(){
    if(this.tabBarElement != null)
      this.tabBarElement.style.display = 'flex';
  }

  logIn() {
    console.log('User ' + this.emailField + ' try to log in with password ' + this.passwordField);

    let loader = this.loadingCtrl.create({
      dismissOnPageChange: true
    });

    loader.present();

    try {
      this.userService.singIn(this.emailField, this.passwordField).then(authData => {
        this.navCtrl.setRoot(Tabs);
      }, error => {
      this.showAlert("Error al iniciar sesión!", error.message);
      this.navCtrl.setRoot(Login);
    }
);
    }
    catch (exception) {
      this.showAlert("Error al iniciar sesión!", exception.message);
      this.navCtrl.setRoot(Login);
      loader.dismiss()
    }
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
