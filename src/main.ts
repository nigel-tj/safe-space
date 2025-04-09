import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { AppComponent } from './app/app.component';
import { Drivers } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { bootstrapApplication } from '@angular/platform-browser';
import { defineCustomElements } from '@ionic/core/loader';
import { environment } from './environments/environment';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideServiceWorker } from '@angular/service-worker';
import { routes } from './app/app-routing.module';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    Storage,
    { provide: 'STORAGE_CONFIG', useValue: {
      name: '__safespace',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }},
    importProvidersFrom(HttpClientModule)
  ]
}).then(() => {
  // Load Ionic web components after Angular is bootstrapped
  defineCustomElements(window);
}).catch(err => console.error(err));
