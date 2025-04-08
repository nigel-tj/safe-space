import { CanLoad, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CheckTutorial implements CanLoad {
  private storage = inject(Storage);
  private router = inject(Router);

  canLoad() {
    return this.storage.get('ion_did_tutorial').then(res => {
      if (res) {
        this.router.navigate(['/app', 'tabs', 'schedule']);
        return false;
      } else {
        return true;
      }
    });
  }
}
