import { Component } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer';
import { UserService } from '../../providers/user-service';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-vehicle-info',
  templateUrl: 'vehicle-info.html',
  providers: [UserService],
})
export class VehicleInfoPage {

  public car: any;
  public verb: any;
  public avg: any;
  public dispName: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userService: UserService, public emailComposer: EmailComposer) {
      this.dispName = this.userService.getDisplayName();
      this.car = this.navParams.get('car');
  }

  ionViewDidEnter() {
    this.avg = (Math.round((this.car.avg - this.car.price) * 100) / 100).toFixed(2);

    if (this.avg < 0) {
      this.verb = "caro";
    } else {
      this.verb = "barato";
    }
    this.avg = Math.abs(this.avg);
  }

  sendMail() {
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
        console.log("Test email")
        // Send a text message using default options
        this.emailComposer.open(email);
      }
    });

    let email = {
      to: this.car.user,
      subject: 'Solicitud de cita',
      body: '<p>Hola! <br>Me interesa mucho el vehiculo: ' + this.car.band +
      ' - ' + this.car.model + ' - ' + this.car.year +
      '<br>Podría responder a este correo para planificar una cita?' +
      '<br>Gracias! <br>ATT, <br>' + this.dispName,
      isHtml: true
    };
  }

}
