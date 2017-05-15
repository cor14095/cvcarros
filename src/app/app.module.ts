import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//import * as firebase from 'firebase';

import { MyApp } from './app.component';
import { HomePage }       from '../pages/home/home';
import { Profile }        from '../pages/profile/profile';
import { PostVehicle }    from '../pages/post-vehicle/post-vehicle';
import { AdvancedSearch } from '../pages/advanced-search/advanced-search';
import { SearchResults }  from '../pages/search-results/search-results';
import { VehiclePost, }    from '../pages/vehicle-post/vehicle-post';
import { Login }          from '../pages/login/login';
import { CreateAccount }  from '../pages/create-account/create-account';
import { ResetPassword }  from '../pages/reset-password/reset-password';
import { Tabs }           from '../pages/tabs/tabs'

import { UserService }    from '../providers/user-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Profile,
    Login,
    CreateAccount,
    Tabs,
    PostVehicle,
    AdvancedSearch,
    SearchResults,
    VehiclePost,
    ResetPassword
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Profile,
    Login,
    CreateAccount,
    Tabs,
    PostVehicle,
    AdvancedSearch,
    SearchResults,
    VehiclePost,
    ResetPassword
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
