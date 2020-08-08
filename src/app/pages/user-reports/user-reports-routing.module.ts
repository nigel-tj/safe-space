import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserReportsPage } from './user-reports.page';

const routes: Routes = [
  {
    path: '',
    component: UserReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserReportsPageRoutingModule {}
