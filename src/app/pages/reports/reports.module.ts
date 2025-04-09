import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { ReportService } from '../../services/report.service';
import { ReportsPage } from './reports.page';
import { ReportsPageRoutingModule } from './reports-routing.module';
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsPageRoutingModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  declarations: [ReportsPage],
  providers: [ReportService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportsPageModule { }
