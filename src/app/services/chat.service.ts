import { Auth, authState } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, limit, orderBy, query } from '@angular/fire/firestore';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

  // Get all chat rooms
  getChatRooms(): Observable<ChatRoom[]> {
    const roomsRef = collection(this.firestore, 'chatRooms');
    return collectionData(roomsRef, { idField: 'id' }) as Observable<ChatRoom[]>;
  }

  // Get messages for a specific room
  getRoomMessages(roomId: string): Observable<ChatMessage[]> {
    const messagesRef = collection(this.firestore, `chatRooms/${roomId}/messages`);
    const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(50));
    return collectionData(q, { idField: 'id' }).pipe(
      map(messages => messages.reverse())
    ) as Observable<ChatMessage[]>;
  }

  // Send a message
  async sendMessage(roomId: string, text: string): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Must be logged in to send messages');

    const messagesRef = collection(this.firestore, `chatRooms/${roomId}/messages`);
    await addDoc(messagesRef, {
      text,
      createdAt: Date.now(),
      user: {
        uid: user.uid,
        displayName: user.displayName || 'Anonymous'
      }
    });
  }

  // Create a new chat room
  async createRoom(name: string, description?: string): Promise<void> {
    const roomsRef = collection(this.firestore, 'chatRooms');
    await addDoc(roomsRef, {
      name,
      description,
      updatedAt: Date.now()
    });
  }
}
