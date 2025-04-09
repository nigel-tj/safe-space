import { ChatMessage, ChatRoom, ChatService } from '../../services/chat.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Auth } from '@angular/fire/auth';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chatrooms',
  templateUrl: './chatrooms.page.html',
  styleUrls: ['./chatrooms.page.scss'],
})
export class ChatroomsPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  chatRooms$: Observable<ChatRoom[]>;
  messages$: Observable<ChatMessage[]>;
  newMessage = '';
  selectedRoom: ChatRoom | null = null;

  constructor(
    private chatService: ChatService,
    private auth: Auth
  ) {
    this.chatRooms$ = this.chatService.getChatRooms();
  }

  ngOnInit() {}

  selectRoom(room: ChatRoom) {
    this.selectedRoom = room;
    this.messages$ = this.chatService.getRoomMessages(room.id);
    this.scrollToBottom();
  }

  async sendMessage() {
    if (!this.selectedRoom || !this.newMessage.trim()) return;

    try {
      await this.chatService.sendMessage(this.selectedRoom.id, this.newMessage);
      this.newMessage = '';
      this.scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  async createRoom() {
    const name = prompt('Enter room name:');
    if (name) {
      try {
        await this.chatService.createRoom(name);
      } catch (error) {
        console.error('Error creating room:', error);
      }
    }
  }

  private scrollToBottom() {
    setTimeout(() => {
      this.content?.scrollToBottom(300);
    }, 100);
  }

  isCurrentUser(message: ChatMessage): boolean {
    return message.user.uid === this.auth.currentUser?.uid;
  }
}
