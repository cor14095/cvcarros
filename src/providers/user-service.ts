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
      console.log("...");
    }

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
        //console.log(snapshot.val());
        return snapshot.val();
      });
    return result;
  }

  setAveragePrices() {
    // Create the dictionaries.
    var sums = [];
    var counts = [];
    var avgs = [];

    // First I'm gonna iterate all cars in DB and get the sums and counts.
    //var mythis = this;
    this.getCars().then(function(objects) {
      // iterate each post.
      for (let key in objects) {
        // Here I have to check if key exist and if it does, sum the value.
        // key: brand+model+year
        // value: sum(prices)
        var customKey = objects[key]["brand"].toLowerCase() + "," +
          objects[key]["model"].toLowerCase() + "," +
          objects[key]["year"].toLowerCase();

        // Check for no dup keys.
        if (!(customKey in sums)) {
          // Create new key and value.
          sums[customKey] = +objects[key]["price"];
          counts[customKey] = 1;
        } else {
          // if it exists then add the value and inc count.
          sums[customKey] += +objects[key]["price"];
          counts[customKey] += 1;
        };
      };

      // After getting all the sums and counts make averages
      // iterate all elements of sum.
      for (let key in sums) {
        avgs[key] = Math.round((sums[key]/counts[key]) * 100) / 100;
      }
      console.log(avgs);

      // Now I have to update the DB.
      var updates = {};
      // iterate each post.
      for (let key in objects) {
        // iterate each avgs key to split it and check if it fits a value to update it.
        for (let keys in avgs) {
          var info = keys.split(",");
          // check all values of info.
          if (objects[key]["brand"].toLowerCase() == info[0]
          && objects[key]["model"].toLowerCase() == info[1]
          && objects[key]["year"].toLowerCase() == info[2]) {
            // It it fits all params, then I must update.
            //console.log('/posts/' + key + "/avg -> " + avgs[keys]);
            updates['/posts/' + key + "/avg"] = avgs[keys];
          };
        };
      };
      console.log(updates);
      return firebase.database().ref().update(updates);
    });

  }

  postVehicle(brand, model, year, odomT, odom, type, cyl, engS, trans, extColor,
    intColor, intType, origin, priceC, price, desc, phone, image): any {
      var user = this.fireAuth.currentUser;
      //console.log(user);
      if (user.emailVerified) {
        // A post entry.
        var avg = 0;
        var postData = {
          brand: brand,
          model: model,
          year: year,
          odomT: odomT,
          odom: odom,
          type: type,
          cyl: cyl,
          engS: engS,
          trans: trans,
          extColor: extColor,
          intColor: intColor,
          intType: intType,
          origin: origin,
          priceC: priceC,
          price: price,
          desc: desc,
          phone: phone,
          avg: avg,
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

  getCarsUser() {

    return new Promise((resolve) => {
      var user = this.fireAuth.currentUser;
      console.log(user.uid);
      firebase.database().ref('/car-posts/' + user.uid).once('value').then(function(snapshot) {
        console.log(snapshot.val());
        resolve(snapshot.val());
      });
    });
  }

  updateProfile(name: string, lastName: string, age: number, email: string, phone: number,
    city: string, zone: number, type: string) {
      var update = {};
      var user = this.fireAuth.currentUser;

      update['/user-data/' + user.uid + '/'] = {
        name: name,
        lastName: lastName,
        age: age,
        email: email,
        phone: phone,
        city: city,
        zone: zone,
        type: type
      };

      return firebase.database().ref().update(update);
    }

}
