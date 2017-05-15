import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostVehicle } from './post-vehicle';

@NgModule({
  declarations: [
    PostVehicle,
  ],
  imports: [
    IonicPageModule.forChild(PostVehicle),
  ],
  exports: [
    PostVehicle
  ]
})
export class PostVehicleModule {}
