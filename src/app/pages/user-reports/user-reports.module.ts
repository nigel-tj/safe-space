import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserReportsPageRoutingModule } from './user-reports-routing.module';

import { UserReportsPage } from './user-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UserReportsPageRoutingModule
  ],
  declarations: [UserReportsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserReportsPageModule {}
