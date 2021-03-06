import { Component } from '@angular/core';
import { UserService } from '../../providers/user-service';
import { Login } from '../login/login';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { ViewPostsPage } from '../view-posts/view-posts';
import { NavController, NavParams, AlertController } from 'ionic-angular';

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
    public userService: UserService, public alertCtrl: AlertController) {
      //this.getValues();
  }

  ionViewWillEnter() {
    this.getValues();
  }

// TODO: Fix this function to return correct values.
// This function was never fixed, but it worked as intended after a while, so...
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

  logOut() {
    this.userService.logOutUser();
    this.navCtrl.setRoot(Login);
  }
  editProfile() {
    // Make a view to edit the profile.
    this.navCtrl.push(EditProfilePage);
  }

  viewPosts() {
    // Make a View like home where you can see user's posts.
    this.navCtrl.push(ViewPostsPage);
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Cerrar sesión?',
      message: 'Esta seguro que desea cerrar su sesión?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log('Agree clicked');
            this.logOut();
          }
        }
      ]
    });
    confirm.present();
  }

}
