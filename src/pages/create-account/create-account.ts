import { Component } from '@angular/core';
import { UserService } from '../../providers/user-service';
import { NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
  providers: [UserService],
})
export class CreateAccount {

  public nameField: any;
  public lastNameField: any;
  public ageField: any;
  public emailField: any;
  public phoneField: any;
  public cityField: any;
  public zoneField: any;
  public typeField: any;
  public passwordField: any;
  public checkPasswordField: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    public userService: UserService, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccount');
  }

  closeRegister() {
    this.viewCtrl.dismiss();
  }

  register() {
    if (this.nameField == undefined || this.lastNameField == undefined || this.ageField == undefined ||
        this.emailField == undefined || this.phoneField == undefined || this.cityField == undefined ||
        this.zoneField == undefined || this.typeField == undefined || this.passwordField == undefined ||
        this.checkPasswordField == undefined) {
          this.showAlert("Error!", "Usted debe de llenar todos los campos, por favor.")
    } else
    if (this.passwordField != this.checkPasswordField) {
      this.showAlert("Error!", "Contraseñas no coinciden.");
      this.passwordField = "";
      this.checkPasswordField = "";
    } else
    if (this.nameField == "Perry" ) {
      console.log("Un herore ha nacido...");
      this.showAlert("Grrrrrr", "Usted no es Perry, solo existe uno y usted no lo es...");
    } else {
      this.userService.singUp(this.nameField, this.lastNameField, this.ageField, this.emailField,
        this.phoneField, this.cityField, this.zoneField, this.typeField, this.passwordField).then(authData => {
          this.viewCtrl.dismiss();
          this.showAlert("Bienvenido a CVCarros " + this.nameField, "Por favor verifique su correo para poder iniciar sesion!");
        }, error => {
          this.showAlert("Error al crear cuenta!", error.message);
        });
        console.log("Creo cuenta de forma exitosa!");
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
