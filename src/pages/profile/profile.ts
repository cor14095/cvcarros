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
    var test = this;
    this.userService.getProfile().then(function(object){
      test.nameField = object.name;
      test.lastNameField = object.lastName;
      test.ageField = object.age;
      test.emailField = object.email;
      test.phoneField = object.phone;
      test.cityField = object.city;
      test.zoneField = object.zone;
      test.typeField = object.type;
    });

  }
}
