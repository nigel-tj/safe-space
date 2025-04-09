import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UserData {
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  hasFavorite(sessionName: string): boolean {
    return (this.favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  async login(username: string): Promise<any> {
    await this._storage?.set(this.HAS_LOGGED_IN, true);
    await this.setUsername(username);
    return window.dispatchEvent(new CustomEvent('user:login'));
  }

  async signup(username: string): Promise<any> {
    await this._storage?.set(this.HAS_LOGGED_IN, true);
    await this.setUsername(username);
    return window.dispatchEvent(new CustomEvent('user:signup'));
  }

  async logout(): Promise<any> {
    await this._storage?.remove(this.HAS_LOGGED_IN);
    await this._storage?.remove('username');
    window.dispatchEvent(new CustomEvent('user:logout'));
  }

  async setUsername(username: string): Promise<any> {
    return this._storage?.set('username', username);
  }

  async getUsername(): Promise<string | null> {
    return this._storage?.get('username');
  }

  async isLoggedIn(): Promise<boolean> {
    const value = await this._storage?.get(this.HAS_LOGGED_IN);
    return value === true;
  }

  async checkHasSeenTutorial(): Promise<string | null> {
    return this._storage?.get(this.HAS_SEEN_TUTORIAL);
  }
}
