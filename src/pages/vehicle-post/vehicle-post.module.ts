import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehiclePost } from './vehicle-post';

@NgModule({
  declarations: [
    VehiclePost,
  ],
  imports: [
    IonicPageModule.forChild(VehiclePost),
  ],
  exports: [
    VehiclePost
  ]
})
export class VehiclePostModule {}
