import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  showSearchbar = false;
  queryText = '';
  ios = false;

  constructor(private platform: Platform) {}

  ngOnInit() {
    this.ios = this.platform.is('ios');
  }

  updateSchedule() {
    // Implement search functionality
  }

  presentFilter() {
    // Implement filter functionality
  }
}
