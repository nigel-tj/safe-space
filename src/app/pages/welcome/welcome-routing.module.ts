import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { WelcomePage } from './welcome';

const routes: Routes = [
  {
    path: '',
    component: WelcomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomePageRoutingModule {}
