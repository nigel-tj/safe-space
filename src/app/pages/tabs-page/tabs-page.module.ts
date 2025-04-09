import { AboutModule } from '../about/about.module';
import { ChatroomsPageModule } from "../chatrooms/chatrooms.module";
import { CommonModule } from '@angular/common';
import { HelpCentersPageModule } from '../help-centers/help-centers.module';
import { IonicModule } from '@ionic/angular';
import { MapModule } from '../map/map.module';
import { NgModule } from '@angular/core';
import { ScheduleModule } from '../schedule/schedule.module';
import { SessionDetailModule } from '../session-detail/session-detail.module';
import { SpeakerDetailModule } from '../speaker-detail/speaker-detail.module';
import { SpeakerListModule } from '../speaker-list/speaker-list.module';
import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    MapModule,
    ScheduleModule,
    SessionDetailModule,
    SpeakerDetailModule,
    SpeakerListModule,
    TabsPageRoutingModule,
    ChatroomsPageModule,
    HelpCentersPageModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
