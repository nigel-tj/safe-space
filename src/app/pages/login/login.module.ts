import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login';
import { LoginPageRoutingModule } from './login-routing.module';
import { environment } from '../../../environments/environment';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Initialize Firebase for this module
const app = initializeApp(environment.firebaseConfig);
const auth = getAuth(app);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [
    LoginPage,
  ],
  providers: [
    AuthenticationService,
    { provide: 'auth', useValue: auth }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginModule { }
