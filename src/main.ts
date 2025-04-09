import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { bootstrapApplication } from '@angular/platform-browser';
// Import Ionic web components
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { defineCustomElements as defineIonicCore } from '@ionic/core/loader';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { register } from 'swiper/element/bundle';

if (environment.production) {
  enableProdMode();
}

// Register Swiper custom elements
register();

// Bootstrap Angular
bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    // Load Ionic web components after Angular is bootstrapped
    defineCustomElements(window);
    defineIonicCore(window);
  })
  .catch(err => console.error(err));
