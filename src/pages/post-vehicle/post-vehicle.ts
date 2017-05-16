import { Component } from '@angular/core';
import { UserService } from '../../providers/user-service';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the PostVehicle page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-post-vehicle',
  templateUrl: 'post-vehicle.html',
  providers: [UserService],
})
export class PostVehicle {

  public brandField: any;
  public modelField: any;
  public yearField: any;
  public odomField: any;
  public typeField: any;
  public extColorField: any;
  public intColorField: any;
  public intTypeField: any;
  public originField: any;
  public priceField: any;
  public descField: any;
  public phoneField: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    public userService: UserService, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostVehicle');
  }

  // This is a helper function to display messages.
  showAlert(tittle: string, message:string) {
    let alert = this.alertCtrl.create({
      title: tittle,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  clearView() {
    this.brandField = undefined;
    this.modelField = undefined;
    this.yearField = undefined;
    this.odomField = undefined;
    this.typeField = undefined;
    this.extColorField = undefined;
    this.intColorField = undefined;
    this.intTypeField = undefined;
    this.originField = undefined;
    this.priceField = undefined;
    this.descField = undefined;
    this.phoneField = undefined;
  }

  publish() {
    // First validate any important field.
    // Important fields:
    // Brand, Model, Year, Price, Desc and Phone.
    if (this.brandField == undefined || this.modelField == undefined ||
    this.yearField == undefined || this.priceField == undefined ||
    this.phoneField == undefined || this.descField == undefined) {
      // If any of these fields are blank then you can't publish the vehicle.
      this.showAlert("Error!", "Por favor llenar minimo los campos de marca, modelo, año, precio, descripción y numero de contacto.");
    } else {
      // Now I check if any other field is left unfilled I channge undefined for "".
      if (this.odomField == undefined) {
        this.odomField = "";
      }
      if (this.typeField == undefined) {
        this.typeField = "";
      }
      if (this.extColorField == undefined) {
        this.extColorField = "";
      }
      if (this.intColorField == undefined) {
        this.intColorField = "";
      }
      if (this.intTypeField == undefined) {
        this.intTypeField = "";
      }
      if (this.originField == undefined) {
        this.originField = "";
      }

      // Generate a random number for the image.
      var random = Math.floor(Math.random() * 20);
      if (random < 1) { random += 1;};
      if (random > 20) {random = 20;};
      var image = random + ".jpg";

      // Now post the car.
      this.userService.postVehicle(this.brandField, this.modelField,
        this.yearField, this.odomField, this.typeField, this.extColorField,
        this.intColorField, this.intTypeField, this.originField,
        this.priceField, this.descField, this.phoneField, image).then(() => {
          this.clearView();
          this.showAlert("Gracias!", "El vehiculo fue publicado con exito!");
        })
    }
  }

}
