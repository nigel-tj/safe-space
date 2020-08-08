import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialWorkerDetailPage } from './social-worker-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SocialWorkerDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialWorkerDetailPageRoutingModule {}
