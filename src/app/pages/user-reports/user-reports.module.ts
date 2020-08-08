import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserReportsPageRoutingModule } from './user-reports-routing.module';

import { UserReportsPage } from './user-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserReportsPageRoutingModule
  ],
  declarations: [UserReportsPage]
})
export class UserReportsPageModule {}
