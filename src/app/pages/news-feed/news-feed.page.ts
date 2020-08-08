import { Component, OnInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.page.html',
  styleUrls: ['./news-feed.page.scss'],
})
export class NewsFeedPage implements OnInit {
  speakers: any[] = [];

  constructor(public confData: ConferenceData) { }

  ionViewDidEnter() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = speakers;
    });
  }

  ngOnInit() {
  }

}
