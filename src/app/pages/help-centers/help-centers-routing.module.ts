import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpCentersPage } from './help-centers.page';

const routes: Routes = [
  {
    path: '',
    component: HelpCentersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpCentersPageRoutingModule {}
