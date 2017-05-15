import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvancedSearch } from './advanced-search';

@NgModule({
  declarations: [
    AdvancedSearch,
  ],
  imports: [
    IonicPageModule.forChild(AdvancedSearch),
  ],
  exports: [
    AdvancedSearch
  ]
})
export class AdvancedSearchModule {}
