import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import * as firebase from 'firebase';

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

const config = {
  apiKey: "AIzaSyCN4fKV5KB0MlnnKOp89ICsPDvkQ5tjBmA",
  authDomain: "cvcarros-1a02d.firebaseapp.com",
  databaseURL: "https://cvcarros-1a02d.firebaseio.com",
  projectId: "cvcarros-1a02d",
  storageBucket: "cvcarros-1a02d.appspot.com",
  messagingSenderId: "130044602111"
}

@Injectable()
export class UserService {

  public fireAuth: any;
  public userProfile: any;
  public postsNumber: any;
  public carPost: any;

  constructor(public alertCtrl: AlertController) {
    // Initialize Firebase
    try {
      firebase.initializeApp(config);
    } catch (exception) {
      console.log(exception.message);
    }
    console.log('Hello UserService Provider');

    // Make authentication and get user profiles.
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('user-data');
    this.carPost = firebase.database().ref('car-posts');
    this.postsNumber = firebase.database().ref('posts');
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

  getDisplayName(): any {
    var user = this.fireAuth.currentUser;
    return user.displayName;
  }

  singIn(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorMessage);
      console.log(errorCode);
    });
  }

  singUp(name: string, lastName: string, age: number, email: string, phone: number,
    city: string, zone: number, type: string, password: string) {
      return this.fireAuth.createUserWithEmailAndPassword(email, password).then(
        (newUser) => {
          // After we register the user, we must log him in.
          this.fireAuth.signInWithEmailAndPassword(email, password).then(
            (authenticatedUser) => {
              authenticatedUser.sendEmailVerification();
              this.userProfile.child(authenticatedUser.uid).set({
                name: name,
                lastName: lastName,
                age: age,
                email: email,
                phone: phone,
                city: city,
                zone: zone,
                type: type
              });
              authenticatedUser.updateProfile({
                displayName: name + " " + lastName
              });
            })
        });
  }

  logOutUser(): any {
    this.fireAuth.singOut;
  }

  forgotPassword(email: string) {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  getProfile () {
    var userId = this.fireAuth.currentUser.uid;
    var result = firebase.database().ref('user-data').child(userId).once('value').then(
      function(snapshot) {
        console.log(snapshot.val());
        return snapshot.val();
      });
    return result;
  }

  postVehicle(brand, model, year, odom, type, extColor, intColor, intType,
    origin, price, desc, phone, image): any {
      var user = this.fireAuth.currentUser;
      console.log(user);
      if (user.emailVerified) {
        // A post entry.
        var postData = {
          brand: brand,
          model: model,
          year: year,
          odom: odom,
          type: type,
          extColor: extColor,
          intColor: intColor,
          intType: intType,
          origin: origin,
          price: price,
          desc: desc,
          phone: phone,
          image: "img/" + image,
          user: user.email
        };

        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child('posts').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/posts/' + newPostKey] = postData;
        updates['/car-posts/' + user.uid + '/' + newPostKey] = postData;

        return firebase.database().ref().update(updates);

      } else {
        this.showAlert("Error", "Usted no ha verificado su correo, verifiquelo antes de poder publicar un vehiculo.");
        user.sendEmailVerification();

        return Promise.resolve(undefined);
      }
  }

  getCars() {
    // If there's no data in cars, then we must check it.
    return new Promise((resolve) => {
      firebase.database().ref('posts').once('value').then(function(snapshot) {
        //console.log(snapshot.val());
        resolve(snapshot.val());
      });
    });
  }

}
