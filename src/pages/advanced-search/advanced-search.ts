import { Component } from '@angular/core';
import { UserService } from '../../providers/user-service';
import { SearchResults } from '../search-results/search-results';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the AdvancedSearch page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-advanced-search',
  templateUrl: 'advanced-search.html',
  providers: [UserService],
})
export class AdvancedSearch {

  public brandField: any;
  public modelField: any;
  public minYearField: any;
  public maxYearField: any;
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
  public minPriceField: any;
  public maxPriceField: any;

  public cars = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController, public userService: UserService,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  clear() {
    this.brandField = "";
    this.modelField = "";
    this.minYearField = "";
    this.maxYearField = "";
    this.odomTypeField = "";
    this.odomField = "";
    this.typeField = "";
    this.cylindersField = "";
    this.engineSizeField = "";
    this.transField = "";
    this.extColorField = "";
    this.intColorField = "";
    this.intTypeField = "";
    this.originField = "";
    this.currencyField = "";
    this.minPriceField = "";
    this.maxPriceField = "";
  }

  removeWhitespaces() {
    this.brandField = this.brandField.replace(" ", "");
    this.modelField = this.modelField.replace(" ", "");
    //this.minYearField = this.minYearField.replace(" ", "");
    //this.maxYearField = this.maxYearField.replace(" ", "");
    this.odomTypeField = this.odomTypeField.replace(" ", "");
    //this.odomField = this.odomField.replace(" ", "");
    this.typeField = this.typeField.replace(" ", "");
    this.cylindersField = this.cylindersField.replace(" ", "");
    this.engineSizeField = this.engineSizeField.replace(" ", "");
    this.transField = this.transField.replace(" ", "");
    this.extColorField = this.extColorField.replace(" ", "");
    this.intColorField = this.intColorField.replace(" ", "");
    this.intTypeField = this.intTypeField.replace(" ", "");
    this.originField = this.originField.replace(" ", "");
    this.currencyField = this.currencyField.replace(" ", "");
    //this.minPriceField = this.minPriceField.replace(" ", "");
    //this.maxPriceField = this.maxPriceField.replace(" ", "");
  }

  validateSearchParams() {
    // Change all undefined to "".
    if (this.brandField == undefined) {
      this.brandField = "";
    };
    if (this.modelField == undefined) {
      this.modelField = "";
    };
    if (this.minYearField == undefined) {
      this.minYearField = -1000;
    };
    if (this.maxYearField == undefined) {
      this.maxYearField = 3000;
    };
    if (this.odomTypeField == undefined) {
      this.odomTypeField = "";
    };
    if (this.odomField == undefined) {
      this.odomField = 10000000;
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
    if (this.currencyField == undefined) {
      this.currencyField = "";
    };
    if (this.minPriceField == undefined) {
      this.minPriceField = -1000;
    };
    if (this.maxPriceField == undefined) {
      this.maxPriceField = 10000000;
    };
    // Remove white spaces to normalize params.
    this.removeWhitespaces();
  }

  loadCars() {
    var test = this;
    this.userService.getCars().then(function(object) {
      // Iterate for each post.
      for (let key in object) {
        //console.log(key + "->" + object[key]);
        test.cars.push(object[key]);
      };
      //console.log (test.cars);
    })
  }

  advanceSearch(){
    try {
      this.validateSearchParams();
      var test = this;
      this.cars = [];
      this.userService.getCars().then(function(object) {
        // Iterate for each post.
        for (let key in object) {
          // Check if params match keywords:
          if (object[key]["brand"].toLowerCase().indexOf(test.brandField.toLowerCase()) !== -1
          && object[key]["model"].toLowerCase().indexOf(test.modelField.toLowerCase()) !== -1
          && object[key]["year"] >= test.minYearField
          && object[key]["year"] <= test.maxYearField
          && object[key]["odomT"].toLowerCase().indexOf(test.odomTypeField.toLowerCase()) !== -1
          && object[key]["odom"] <= parseFloat(test.odomField)
          && object[key]["type"].toLowerCase().indexOf(test.typeField.toLowerCase()) !== -1
          && object[key]["cyl"].toLowerCase().indexOf(test.cylindersField.toLowerCase()) !== -1
          && object[key]["engS"].toLowerCase().indexOf(test.engineSizeField.toLowerCase()) !== -1
          && object[key]["trans"].toLowerCase().indexOf(test.transField.toLowerCase()) !== -1
          && object[key]["extColor"].toLowerCase().indexOf(test.extColorField.toLowerCase()) !== -1
          && object[key]["intColor"].toLowerCase().indexOf(test.intColorField.toLowerCase()) !== -1
          && object[key]["intType"].toLowerCase().indexOf(test.intTypeField.toLowerCase()) !== -1
          && object[key]["origin"].toLowerCase().indexOf(test.originField.toLowerCase()) !== -1
          && object[key]["priceC"].toLowerCase().indexOf(test.currencyField.toLowerCase()) !== -1
          && object[key]["price"] >= test.minPriceField
          && object[key]["price"] <= test.maxPriceField
          ) {
            test.cars.push(object[key]);
          }
        };
        test.navCtrl.push(SearchResults, {cars: test.cars});
        //test.clear();
      });

      let loader = this.loadingCtrl.create({
        dismissOnPageChange: true
      });

      loader.present();

    } catch (exception) {
      console.log("advanceSearch() -> " + exception.message);
    }
  }

}
