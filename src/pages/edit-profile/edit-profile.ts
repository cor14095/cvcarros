import { Component } from '@angular/core';
import { UserService } from '../../providers/user-service';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
  providers: [UserService],
})
export class EditProfilePage {

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

  edit(){
    if (this.nameField != "" && this.lastNameField != "" && this.phoneField != "") {
      this.userService.updateProfile(this.nameField, this.lastNameField,
        this.ageField, this.emailField, this.phoneField, this.cityField,
        this.zoneField, this.typeField).then(() => {
          this.userService.showAlert("Completado", "Su perfil se ha actualizado de forma correcta!");
          this.navCtrl.pop();
        });
    } else {
      this.userService.showAlert("Error", "Los campos de nombre, apellido y numero de teléfono NO pueden estar vacios.");
    }
  }

}
