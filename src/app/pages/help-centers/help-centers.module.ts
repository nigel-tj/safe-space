import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpCentersPageRoutingModule } from './help-centers-routing.module';

import { HelpCentersPage } from './help-centers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpCentersPageRoutingModule
  ],
  declarations: [HelpCentersPage]
})
export class HelpCentersPageModule {}
