import { AfterViewInit, Component, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import { timer } from 'rxjs';
import {ship, coordinates } from '../../data/ship';
import { BackendService } from '../backend.service';
import { LoggerService } from '../logger.service';
import { Router } from '@angular/router';

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

  constructor(private backend: BackendService, private login: LoggerService, private _router: Router, public elementRef : ElementRef) { }

  private map: L.Map | undefined;
  private markers = new Map<ship, L.Marker>();
  private tick: any;
  private isWatcher = false;

  private initMap(): void {
    //check
    this.isWatcher = this._router.url.includes("/watcher");
    console.log(this._router.url);
    this.getPosition().then((pos) => {
      console.log(pos);
      return {lat: pos.latitude, lng: pos.longitude, zoom: 10};
    }).catch((err) => {
      console.log(err);
      return{ lat: 51.505, lng: -0.09, zoom: 4 };
    }).then((initialState) => {
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
      });
    }
  
    updatesMarkers(map: L.Map, ships: ship[]): void {
      console.log(ships);
      let moved = 
      Array.from(this.markers.keys())
      .filter((i) => ships.find((j) => i.name === j.name && (i.actual_position.latitude !== j.actual_position.latitude || 
        i.actual_position.longitude !== j.actual_position.longitude)) );
      moved.forEach((i) => {
        let marker = this.markers.get(i);
        const ship = ships.find((j) => i.name === j.name);
        if (marker && ship) {
          let newMarker = this.creteMarker(ship);
          if(marker.isPopupOpen()) {
            newMarker.openPopup();
          }
          this.map!.removeLayer(marker);
          this.markers.delete(i);
          this.markers.set(ship, newMarker);

        }
      });
      let newShips = ships.filter((i) => Array.from(this.markers.keys()).find((j) => i.name === j.name) === undefined);
      newShips.forEach((i) => {
        let marker = this.creteMarker(i);
        this.markers.set(i, marker);
      }
      );
      
  }

  private creteMarker(ship: ship): L.Marker {
    let marker = L.marker([ship.actual_position.latitude, ship.actual_position.longitude]);
    marker.addTo(this.map!);
    marker.bindPopup(`
    <p>${ship.name}</p>
    <p>${ship.actual_position.latitude}</p>
    <p>${ship.actual_position.longitude}</p>
    <p>${ship.status}</p>
    <p>${ship.choosed_route}</p>
    <button id =${ship.name} class="mapMarker"">chat</button>
    `);
    marker.on('popupopen', () => {
      this.elementRef.nativeElement.querySelector(`#${ship.name}`)?.addEventListener('click', () => {
        if(this.isWatcher) {
          this._router.navigate(['watcher/chat'+ ship.name]);
        }else{
          this._router.navigate(['user/chat/' + ship.name]);
        }
      });
    });
    marker.bindTooltip("<b>" + ship.name + "</b>");
    if(ship.status === 'alarm') {
     marker.openPopup();
    }
    return marker;
  }

  ngAfterViewInit(): void {
    this.initMap();
    const source = timer(0, 500);
    this.tick = source.subscribe(val => {
      console.log(val, '-');
      this.backend.getShips()
      .subscribe(
        (data) => {
          console.log(data);
          this.updatesMarkers(this.map!, data);
        });
    })
  }

  ngOnDestroy(): void {
    this.tick.unsubscribe();
  }

  private async getPosition(): Promise<coordinates>
  {
    return await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({longitude: resp.coords.longitude, latitude: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });
  }
}
