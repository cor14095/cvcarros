import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
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

  constructor() {
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
  }

  singIn(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorMessage);
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
        //console.log(snapshot.val());
        return snapshot.val();
      });
    return result;
  }

}
