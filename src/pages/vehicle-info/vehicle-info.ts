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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userService: UserService, public emailComposer: EmailComposer) {
      this.car = this.navParams.get('car');
      try {
        this.emailComposer.isAvailable().then((available: boolean) =>{
          if(available) {
            //Now we know we can send
            console.log("Test email");
          }
        });
      } catch (exception) {
        console.log(exception.message);
      }
  }

  ionViewDidEnter() {
    this.avg = Math.abs(Math.round((this.car.price - this.car.avg) * 100) / 100).toFixed(2);

    if (this.avg < 0) {
      this.verb = "caro";
    } else {
      this.verb = "barato";
    }
  }

}
