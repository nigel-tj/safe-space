import { RouterModule, Routes } from '@angular/router';

import { IonicStorageModule } from '@ionic/storage-angular';
import { NgModule } from '@angular/core';
import { WelcomePage } from './welcome';
import { WelcomePageRoutingModule } from './welcome-routing.module';

const routes: Routes = [
  {
    path: '',
    component: WelcomePage
  }
];

@NgModule({
  imports: [
    WelcomePageRoutingModule,
    IonicStorageModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [],
  providers: []
})
export class WelcomeModule {}
