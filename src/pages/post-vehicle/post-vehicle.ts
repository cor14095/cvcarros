import { Component, NgZone } from '@angular/core';
import { UserService } from '../../providers/user-service';
import { NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';

import firebase from 'firebase';

@Component({
  selector: 'page-post-vehicle',
  templateUrl: 'post-vehicle.html',
  providers: [UserService, FileChooser],
})
export class PostVehicle {

  public brandField: any;
  public modelField: any;
  public yearField: any;
  public odomTypeField: any;
  public odomField: any;
  public typeField: any;
  public cylindersField: any;
  public engineSizeField: any;
  public transField: any;
  public extColorField: any;
  public intColorField: any;
  public intTypeField: any;
  public originField: any;
  public currencyField: any;
  public priceField: any;
  public descField: any;
  public phoneField: any;
  public image: any;

  nativepath: any;
  firestore = firebase.storage();


  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    public userService: UserService, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,public zone: NgZone, public fileChooser: FileChooser) {
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
    this.odomTypeField = undefined;
    this.odomField = undefined;
    this.typeField = undefined;
    this.cylindersField = undefined;
    this.engineSizeField = undefined;
    this.transField = undefined;
    this.extColorField = undefined;
    this.intColorField = undefined;
    this.intTypeField = undefined;
    this.originField = undefined;
    this.currencyField = undefined;
    this.priceField = undefined;
    this.descField = undefined;
    this.phoneField = undefined;
    this.image = undefined;
  }

  removeWhitespaces() {
    try {
      this.brandField = this.brandField.replace(" ", "");
      this.modelField = this.modelField.replace(" ", "");
      this.yearField = this.yearField.replace(" ", "");
      this.odomTypeField = this.odomTypeField.replace(" ", "");
      this.odomField = this.odomField.replace(" ", "");
      this.typeField = this.typeField.replace(" ", "");
      this.cylindersField = this.cylindersField.replace(" ", "");
      this.engineSizeField = this.engineSizeField.replace(" ", "");
      this.transField = this.transField.replace(" ", "");
      this.extColorField = this.extColorField.replace(" ", "");
      this.intColorField = this.intColorField.replace(" ", "");
      this.intTypeField = this.intTypeField.replace(" ", "");
      this.originField = this.originField.replace(" ", "");
      this.currencyField = this.currencyField.replace(" ", "");
      this.priceField = this.priceField.replace(" ", "");
      this.descField = this.descField.replace(" ", "");
      this.phoneField = this.phoneField.replace(" ", "");
    } catch (e) {
      console.log("...");
    }
  }

  publish() {
    // First validate any important field.
    this.removeWhitespaces();
    // Important fields:
    // Brand, Model, Year, Price, Desc and Phone.
    if (this.brandField == undefined || this.modelField == undefined ||
    this.yearField == undefined || this.priceField == undefined ||
    this.phoneField == undefined || this.descField == undefined ||
    this.currencyField == undefined || this.image == undefined) {
      // If any of these fields are blank then you can't publish the vehicle.
      this.showAlert("Error!", "Por favor llenar minimo los campos de marca, modelo, año, precio, descripción y numero de contacto.");
    } else {
      // Now I check if any other field is left unfilled I channge undefined for "".
      if (this.odomField == undefined) {
        this.odomField = "";
      };
      if (this.odomTypeField == undefined) {
        this.odomTypeField = "";
      };
      if (this.typeField == undefined) {
        this.typeField = "";
      };
      if (this.cylindersField == undefined) {
        this.cylindersField = "";
      };
      if (this.engineSizeField == undefined) {
        this.engineSizeField = "";
      };
      if (this.transField == undefined) {
        this.transField = "";
      };
      if (this.extColorField == undefined) {
        this.extColorField = "";
      };
      if (this.intColorField == undefined) {
        this.intColorField = "";
      };
      if (this.intTypeField == undefined) {
        this.intTypeField = "";
      };
      if (this.originField == undefined) {
        this.originField = "";
      };

      // Some minor validations for estandarization.
      if (this.currencyField == "USD") {
        this.priceField *= 7.33;
        this.priceField = Math.round(this.priceField * 100) / 100;
      };
      if (this.currencyField == "Euro") {
        this.priceField *= 8.14;
        this.priceField = Math.round(this.priceField * 100) / 100;
      };
      if (this.odomTypeField == "mi") {
        this.odomField *= 1.60934;
        this.odomField = Math.floor(this.odomField * 100) / 100;
      };

      /*
      // Generate a random number for the image. This is a placeholder.
      var random = Math.floor(Math.random() * 20);
      if (random < 1) { random += 1;};
      if (random > 20) {random = 20;};
      var image = random + ".jpg";
      */

      // Now post the car.
      this.userService.postVehicle(this.brandField, this.modelField,
        this.yearField, this.odomTypeField, this.odomField,
        this.typeField, this.cylindersField, this.engineSizeField,
        this.transField, this.extColorField, this.intColorField,
        this.intTypeField, this.originField, this.currencyField,
        this.priceField, this.descField, this.phoneField, this.image).then(() => {
          this.clearView();
          this.showAlert("Gracias!", "El vehiculo fue publicado con exito!");
        });
      this.userService.setAveragePrices();
    };
  }

  store(){

    this.fileChooser.open().then((url) => {
      (<any>window).FilePath.resolveNativePath(url, (result) => {
          this.nativepath = result;
          this.uploadimage();
        }
      )
    })
  }

  uploadimage() {
    (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
      res.file((resFile) => {
        var reader = new FileReader();
        reader.readAsArrayBuffer(resFile);
        reader.onloadend = (evt: any) => {
          var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
          var imageStore = this.firestore.ref().child('image');
          imageStore.put(imgBlob).then((res) => {
            alert('Upload Success');
          }).catch((err) => {
            alert('Upload Failed' + err);
          })
        }
      })
    });
    this.display();
  }

  display() {
    this.firestore.ref().child('image').getDownloadURL().then((url) => {
      this.zone.run(() => {
        this.image = url;
      })
    })
  }

}

