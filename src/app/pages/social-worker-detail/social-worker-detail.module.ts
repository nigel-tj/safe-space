import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialWorkerDetailPageRoutingModule } from './social-worker-detail-routing.module';

import { SocialWorkerDetailPage } from './social-worker-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocialWorkerDetailPageRoutingModule
  ],
  declarations: [SocialWorkerDetailPage]
})
export class SocialWorkerDetailPageModule {}
