import { Auth, User, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, doc, docData, orderBy, query, updateDoc } from '@angular/fire/firestore';
import { Observable, from, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';

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
  createdAt?: number;
  moderators?: Record<string, boolean>;
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
    return new Observable(subscriber => {
      onAuthStateChanged(this.auth, user => {
        if (!user) {
          subscriber.error(new Error('Must be logged in to access chat rooms'));
          return;
        }

        const chatRoomsRef = collection(this.firestore, 'chatRooms');
        const q = query(chatRoomsRef, orderBy('updatedAt', 'desc'));
        collectionData(q, { idField: 'id' }).subscribe({
          next: (rooms) => subscriber.next(rooms as ChatRoom[]),
          error: (error) => subscriber.error(error)
        });
      });
    });
  }

  // Get messages for a specific room
  getRoomMessages(roomId: string): Observable<ChatMessage[]> {
    return new Observable(subscriber => {
      onAuthStateChanged(this.auth, user => {
        if (!user) {
          subscriber.error(new Error('Must be logged in to access messages'));
          return;
        }

        const messagesRef = collection(this.firestore, `chatRooms/${roomId}/messages`);
        const q = query(messagesRef, orderBy('createdAt', 'asc'));
        collectionData(q, { idField: 'id' }).subscribe({
          next: (messages) => subscriber.next(messages as ChatMessage[]),
          error: (error) => subscriber.error(error)
        });
      });
    });
  }

  // Send a message to a room
  async sendMessage(roomId: string, text: string): Promise<void> {
    const user = await this.auth.currentUser;
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

    // Update room's last message and timestamp
    const roomRef = doc(this.firestore, `chatRooms/${roomId}`);
    await updateDoc(roomRef, {
      lastMessage: text,
      updatedAt: Date.now()
    });
  }

  // Create a new chat room
  async createRoom(name: string): Promise<void> {
    const user = await this.auth.currentUser;
    if (!user) throw new Error('Must be logged in to create rooms');

    const roomsRef = collection(this.firestore, 'chatRooms');
    await addDoc(roomsRef, {
      name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      moderators: {
        [user.uid]: true
      }
    });
  }
}
