import { Auth, User } from '@angular/fire/auth';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) {}

  async getCurrentUserId(): Promise<string> {
    const user = await this.auth.currentUser;
    return user?.uid || '';
  }
}
