import { Component } from '@angular/core';
import { UserService } from '../../providers/user-service';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
  providers: [UserService],
})
export class ResetPassword {

  public emailField: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public userService: UserService,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPassword');
  }

  closeReset() {
    this.viewCtrl.dismiss();
  }

  resetPassword() {
    if (this.emailField != undefined) {
      console.log("Sending recovery email to: " + this.emailField);
      this.userService.forgotPassword(this.emailField);
      this.showAlert("Correo enviado.", "Un correo fue enviado para recuperar tu contraseña.");
      this.closeReset();
    } else {
      this.showAlert("Error!", "Por favor llena el campo de correo!");
    }
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
