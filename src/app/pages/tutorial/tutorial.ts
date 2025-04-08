import { Component, ViewChild } from '@angular/core';
import { IonicSlides, MenuController } from '@ionic/angular';

import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
  styleUrls: ['./tutorial.scss'],
})
export class TutorialPage {
  showSkip = true;

  @ViewChild('slides') slides: any;

  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage
  ) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  startApp() {
    this.router
      .navigateByUrl('/home', { replaceUrl: true })
      .then(() => this.storage.set('ion_did_tutorial', true));
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  ionViewWillEnter() {
    this.storage.get('ion_did_tutorial').then(res => {
      if (res === true) {
        this.router.navigateByUrl('/home', { replaceUrl: true });
      }
    });

    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
