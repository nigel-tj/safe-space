import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';


@Component({
  selector: 'app-help-centers',
  templateUrl: './help-centers.page.html',
  styleUrls: ['./help-centers.page.scss'],
})
export class HelpCentersPage implements OnInit {

  map: Leaflet.Map;
  propertyList = [];
  
  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.map = new Leaflet.Map('mapId').setView([42.35663, -71.1109], 16);

    Leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: 'nseye.co.zw'
    }).addTo(this.map);

    fetch('./assets/data/data.json')
      .then(res => res.json())
      .then(data => {
        this.propertyList = data.map;
        this.leafletMap();
      })
      .catch(err => console.error(err));
  }

  leafletMap() {
    for (const property of this.propertyList) {
      Leaflet.marker([property.lat, property.lng]).addTo(this.map)
        .bindPopup(property.city)
        .openPopup();
    }
  }

  ionViewWillLeave() {
    this.map.remove();
  }

}
