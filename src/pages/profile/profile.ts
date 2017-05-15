import { Component } from '@angular/core';
import { UserService } from '../../providers/user-service';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [UserService],
})
export class Profile {

  public nameField: any;
  public lastNameField: any;
  public ageField: any;
  public emailField: any;
  public phoneField: any;
  public cityField: any;
  public zoneField: any;
  public typeField: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userService: UserService) {
      this.getValues();
  }

// TODO: Fix this function to return correct values.
  getValues() {
    var values = this.userService.getProfile();
    console.log(values); // <-- This returns something.
    /*
    this.nameField = values["name"];
    this.lastNameField = values["lastName"];
    this.ageField = values["age"];
    this.emailField = values["email"];
    this.phoneField = values["phone"];
    this.cityField = values["city"];
    this.zoneField = values["zone"];
    this.typeField = values["type"];
    */
  }

}
