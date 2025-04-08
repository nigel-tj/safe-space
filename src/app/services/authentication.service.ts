import { Injectable, Inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User
} from 'firebase/auth';
import { Observable, from, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(@Inject('auth') private auth: Auth) {
    // Initialize the current user from the auth state
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
    });
  }

  async isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user) => {
        resolve(!!user);
      });
    });
  }

  registerUser(value: { email: string, password: string }) {
    return from(createUserWithEmailAndPassword(
      this.auth,
      value.email,
      value.password
    ));
  }

  login(value: { email: string, password: string }) {
    return from(signInWithEmailAndPassword(
      this.auth,
      value.email,
      value.password
    ));
  }

  logoutUser() {
    return from(signOut(this.auth));
  }

  userDetails() {
    return this.currentUser$;
  }

  currentUserWithScope() {
    return this.auth.currentUser;
  }

  resetPassword(email: string) {
    return from(sendPasswordResetEmail(this.auth, email));
  }
}
