import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { Observable, timer } from 'rxjs';
import {ship, coordinates } from '../../data/ship';
import query from '../../data/query';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-ships-map',
  templateUrl: './ships-map.component.html',
  styleUrls: ['./ships-map.component.scss']
})
export class ShipsMapComponent implements AfterViewInit {

  constructor(private http: HttpClient) { }

  private map: L.Map | undefined;
  private markers = new Map<ship, L.Marker>();
  private tick: any;

  private initMap(): void {
      const initialState = { lng: 11, lat: 49, zoom: 4 };
  
      const lefletMap: L.Map = L.map('map').setView(
          [initialState.lat, initialState.lng],
          initialState.zoom
      );
  
      this.map = lefletMap;
  
      const isRetina = L.Browser.retina;
      const baseUrl =
        'https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}';
      const retinaUrl =
        'https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}';
  
      L.tileLayer(isRetina ? retinaUrl : baseUrl, {
        attribution:
          'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
        // This API key is for use only in stackblitz.com
        // Get your Geoapify API key on https://www.geoapify.com/get-started-with-maps-api
        // The Geoapify service is free for small projects and the development phase.
        apiKey: 'abe6874472c0421ea555b3af62758aba',
        maxZoom: 20,
        id: 'osm-bright',
      } as any).addTo(lefletMap);
    }
  
    updatesMarkers(map: L.Map, ships: ship[]): void {
      console.log(ships);
      let moved = 
      Array.from(this.markers.keys())
      .filter((i) => ships.find((j) => i.name === j.name && (i.actual_position.x !== j.actual_position.x || i.actual_position.y !== j.actual_position.y)) );
      console.log(moved);
      moved.forEach((i) => {
        let marker = this.markers.get(i);
        const ship = ships.find((j) => i.name === j.name);
        if (marker && ship) {
          this.map!.removeLayer(marker);
          this.markers.delete(i);
          let newMarker = L.marker([ship.actual_position.x, ship.actual_position.y]);
          newMarker.addTo(map);
          newMarker.bindTooltip(`<p>${i.name}</p>`);
          this.markers.set(ship, newMarker);
        }
      });
      let newShips = ships.filter((i) => !this.markers.has(i));
      newShips.forEach((i) => {
        let marker = L.marker([i.actual_position.x, i.actual_position.y]);
        marker.addTo(map);
        marker.bindTooltip(`<p>${i.name}</p>`);
        this.markers.set(i, marker);
      }
      );
      
  }

  ngAfterViewInit(): void {
    this.initMap();
    const source = timer(0, 500);
    this.tick = source.subscribe(val => {
      console.log(val, '-');
      this.http.get<query<ship>>('http://localhost:3000/shipreq/getall')
      .subscribe(
        (data) => {
          console.log(data);
          if(data.found > 0) {
            //this.remove();
            this.updatesMarkers(this.map!, data.payload);
          }
        });
    })
  }

  ngOnDestroy(): void {
    this.tick.unsubscribe();
  }
}
