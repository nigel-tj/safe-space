import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { ChatMessage, ChatRoom, ChatService } from '../../services/chat.service';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { IonContent, ToastController } from '@ionic/angular';
import { Observable, catchError, of } from 'rxjs';

import { Router } from '@angular/router';

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

  private chatService = inject(ChatService);
  private auth = inject(Auth);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);

  constructor() {
    // We'll handle auth check in ngOnInit
  }

  ngOnInit() {
    // Set up auth state listener
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, load chat rooms
        this.loadChatRooms();
      } else {
        // No user is signed in, redirect to login
        this.router.navigate(['/login']);
      }
    });
  }

  private loadChatRooms() {
    this.chatRooms$ = this.chatService.getChatRooms().pipe(
      catchError(async (error) => {
        console.error('Error loading chat rooms:', error);
        const toast = await this.toastCtrl.create({
          message: error.message || 'Failed to load chat rooms',
          duration: 3000,
          color: 'danger'
        });
        await toast.present();
        return [];
      })
    );
  }

  selectRoom(room: ChatRoom) {
    if (!this.auth.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.selectedRoom = room;
    this.messages$ = this.chatService.getRoomMessages(room.id).pipe(
      catchError(async (error) => {
        console.error('Error loading messages:', error);
        const toast = await this.toastCtrl.create({
          message: error.message || 'Failed to load messages',
          duration: 3000,
          color: 'danger'
        });
        await toast.present();
        return [];
      })
    );
    this.scrollToBottom();
  }

  async sendMessage() {
    if (!this.auth.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.selectedRoom || !this.newMessage.trim()) return;

    try {
      await this.chatService.sendMessage(this.selectedRoom.id, this.newMessage);
      this.newMessage = '';
      this.scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
      const toast = await this.toastCtrl.create({
        message: error.message || 'Failed to send message',
        duration: 3000,
        color: 'danger'
      });
      await toast.present();
    }
  }

  async createRoom() {
    if (!this.auth.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    const name = prompt('Enter room name:');
    if (name) {
      try {
        await this.chatService.createRoom(name);
        const toast = await this.toastCtrl.create({
          message: 'Chat room created successfully',
          duration: 2000,
          color: 'success'
        });
        await toast.present();
      } catch (error) {
        console.error('Error creating room:', error);
        const toast = await this.toastCtrl.create({
          message: error.message || 'Failed to create room',
          duration: 3000,
          color: 'danger'
        });
        await toast.present();
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
