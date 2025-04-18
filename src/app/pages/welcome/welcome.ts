import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
  styleUrls: ['./welcome.scss'],
  standalone: true,
  imports: [IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WelcomePage implements OnInit, AfterViewInit {
  showSkip = true;
  @ViewChild('slides') slides: ElementRef;

  constructor(
    private router: Router,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
    // Check if user has already seen the welcome
    const seen = await this.storage.get('ion_did_tutorial');
    if (seen) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }

  ngAfterViewInit() {
    if (this.slides && this.slides.nativeElement) {
      const swiperEl = this.slides.nativeElement;
      Object.assign(swiperEl, {
        slidesPerView: 1,
        pagination: true,
        effect: 'slide',
        autoHeight: false,
        allowTouchMove: true,
        speed: 400,
        initialSlide: 0,
        cssMode: true
      });
      swiperEl.initialize();
    }
  }

  async startApp() {
    await this.storage.set('ion_did_tutorial', true);
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  async onSlideChange() {
    if (this.slides && this.slides.nativeElement) {
      const swiper = this.slides.nativeElement.swiper;
      if (swiper) {
        this.showSkip = !swiper.isEnd;
      }
    }
  }
}
