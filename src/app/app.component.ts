import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { MenuController, Platform, ToastController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { SwUpdate } from '@angular/service-worker';
import { UserData } from './providers/user-data';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    IonicModule,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    UserData
  ]
})
export class AppComponent implements OnInit {
  private menu = inject(MenuController);
  private platform = inject(Platform);
  private router = inject(Router);
  private storage = inject(Storage);
  private userData = inject(UserData);
  private swUpdate = inject(SwUpdate);
  private toastCtrl = inject(ToastController);

  appPages = [
    {
      title: 'News Feed',
      url: '/app/tabs/news-feed',
      icon: 'list'
    },
    {
      title: 'Social Workers',
      url: '/app/tabs/social-workers',
      icon: 'people'
    },
    {
      title: 'Chat Rooms',
      url: '/app/tabs/chatrooms',
      icon: 'chatbubbles'
    },
    {
      title: 'Report',
      url: '/app/tabs/reports',
      icon: 'megaphone'
    },
    {
      title: 'Help Centers',
      url: '/app/tabs/map',
      icon: 'map'
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle'
    }
  ];

  loggedIn = false;
  dark = false;
  appName = environment.appName;
  version = environment.version;

  constructor() {
    this.initializeApp();
  }

  async ngOnInit() {
    await this.storage.create();
    this.checkLoginStatus();
    this.listenForLoginEvents();
    this.setupServiceWorker();
  }

  private async setupServiceWorker() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(event => {
        if (event.type === 'VERSION_READY') {
          this.promptUserUpdate();
        }
      });
    }
  }

  private async promptUserUpdate() {
    const toast = await this.toastCtrl.create({
      message: 'Update available!',
      position: 'bottom',
      buttons: [
        {
          role: 'cancel',
          text: 'Reload'
        }
      ]
    });

    await toast.present();

    toast.onDidDismiss()
      .then(() => this.swUpdate.activateUpdate())
      .then(() => window.location.reload());
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('hybrid')) {
        this.setupStatusBar();
      }
    });
  }

  private setupStatusBar() {
    const statusBar = document.querySelector('ion-status-bar') as HTMLElement;
    if (statusBar) {
      statusBar.style.backgroundColor = this.dark ? '#000000' : '#ffffff';
    }
  }

  async checkLoginStatus() {
    const loggedIn = await this.userData.isLoggedIn();
    this.updateLoggedInStatus(loggedIn);
  }

  private updateLoggedInStatus(loggedIn: boolean) {
    this.loggedIn = loggedIn;
  }

  private listenForLoginEvents() {
    window.addEventListener('user:login', () => this.updateLoggedInStatus(true));
    window.addEventListener('user:signup', () => this.updateLoggedInStatus(true));
    window.addEventListener('user:logout', () => this.updateLoggedInStatus(false));
  }

  async logout() {
    await this.userData.logout();
    await this.router.navigateByUrl('/app/tabs/schedule');
  }

  async openTutorial() {
    await this.storage.set('ion_did_tutorial', false);
    await this.router.navigateByUrl('/welcome');
  }
}
