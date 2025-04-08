import { CanLoad, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CheckTutorial implements CanLoad {
  private storage = inject(Storage);
  private router = inject(Router);

  async canLoad() {
    await this.storage.create();
    const hasSeenWelcome = await this.storage.get('ion_did_tutorial');

    if (hasSeenWelcome) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
