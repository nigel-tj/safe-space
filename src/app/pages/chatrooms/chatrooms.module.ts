import { ChatroomsPage } from './chatrooms.page';
import { ChatroomsPageRoutingModule } from './chatrooms-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatroomsPageRoutingModule
  ],
  declarations: [ChatroomsPage],
  providers: []
})
export class ChatroomsPageModule {}
