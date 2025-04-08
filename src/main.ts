import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

// Import Ionic web components
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { defineCustomElements as defineIonicCore } from '@ionic/core/loader';

if (environment.production) {
  enableProdMode();
}

// Bootstrap Angular
bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    // Load Ionic web components after Angular is bootstrapped
    defineCustomElements(window);
    defineIonicCore(window);
  })
  .catch(err => console.error(err));
