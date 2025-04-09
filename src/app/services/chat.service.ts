import { Auth, authState } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, limit, orderBy, query } from '@angular/fire/firestore';
import { Injectable, inject } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface ChatMessage {
  id?: string;
  text: string;
  createdAt: number;
  user: {
    uid: string;
    displayName: string;
  };
}

export interface ChatRoom {
  id?: string;
  name: string;
  description?: string;
  lastMessage?: string;
  updatedAt: number;
  moderators?: Record<string, boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  // Get all chat rooms
  getChatRooms(): Observable<ChatRoom[]> {
    return authState(this.auth).pipe(
      switchMap(user => {
        if (!user) {
          return throwError(() => new Error('Must be logged in to access chat rooms'));
        }
        const roomsRef = collection(this.firestore, 'chatRooms');
        const q = query(roomsRef, orderBy('updatedAt', 'desc'));
        return collectionData(q, { idField: 'id' }) as Observable<ChatRoom[]>;
      })
    );
  }

  // Get messages for a specific room
  getRoomMessages(roomId: string): Observable<ChatMessage[]> {
    return authState(this.auth).pipe(
      switchMap(user => {
        if (!user) {
          return throwError(() => new Error('Must be logged in to access messages'));
        }
        const messagesRef = collection(this.firestore, `chatRooms/${roomId}/messages`);
        const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(50));
        return collectionData(q, { idField: 'id' }).pipe(
          map(messages => messages.reverse())
        ) as Observable<ChatMessage[]>;
      })
    );
  }

  // Send a message
  async sendMessage(roomId: string, text: string): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('Must be logged in to send messages');
    }

    const messagesRef = collection(this.firestore, `chatRooms/${roomId}/messages`);
    const messageData = {
      text,
      createdAt: Date.now(),
      user: {
        uid: user.uid,
        displayName: user.displayName || 'Anonymous'
      }
    };

    // Add message and update room's lastMessage
    await Promise.all([
      addDoc(messagesRef, messageData),
      this.updateRoomLastMessage(roomId, text)
    ]);
  }

  // Create a new chat room
  async createRoom(name: string, description?: string): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('Must be logged in to create rooms');
    }

    const roomsRef = collection(this.firestore, 'chatRooms');
    await addDoc(roomsRef, {
      name,
      description,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      lastMessage: '',
      moderators: {
        [user.uid]: true // Make the creator a moderator
      }
    });
  }

  // Update room's last message and timestamp
  private async updateRoomLastMessage(roomId: string, lastMessage: string): Promise<void> {
    const roomRef = collection(this.firestore, 'chatRooms');
    await addDoc(roomRef, {
      lastMessage,
      updatedAt: Date.now()
    });
  }
}
