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
    var greenIcon = L.icon({
      iconUrl: './assets/icons/leaf-green.png',
      shadowUrl: './assets/icons/leaf-shadow.png',
  
      iconSize:     [38, 95], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

    for (const property of this.propertyList) {
      Leaflet.marker([property.lat, property.lng], {icon: greenIcon}).addTo(this.map)
        .bindPopup(property.city)
        .openPopup();
    }
  }

  ionViewWillLeave() {
    this.map.remove();
  }

}
