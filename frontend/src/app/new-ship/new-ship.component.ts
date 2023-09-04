import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from '../logger.service';
import { BackendService } from '../backend.service';
import { catchError } from 'rxjs';
import { ship } from 'src/data/ship';

@Component({
  selector: 'app-new-ship',
  templateUrl: './new-ship.component.html',
  styleUrls: ['./new-ship.component.scss']
})
export class NewShipComponent {

newShipName: String = '';
selectedRoute: String = '';
routes: String[] = [];
latitude: number = 0.0;
longitude: number = 0.0;
error = false;
message: String = '';

constructor(private _router: Router, private http: HttpClient, private loggerService: LoggerService, private backendService: BackendService) {}

ngOnInit() {
  this.backendService.getAllRoutes()
  .pipe(
    catchError((err) => {
      console.log('error');
      console.log(err);
      return [];
    }))
    .subscribe(
      (data) => {
        console.log('data');
        console.log(data);
        this.routes = data.payload.map((route: any) => route.name as String);
      }
    )
 }

 changeRoute(route: String) {
  console.log('changeRoute');
  this.selectedRoute = route;
}

public addShip() {
  console.log('addShip');
  const newShip : ship = {
    name: this.newShipName,
	choosed_route: this.selectedRoute,
	actual_position: {
    latitude: this.latitude,
    longitude: this.longitude
  },
  	status: 'normal',
	owner: this.loggerService.getUsername()!!
  }
  this.backendService.addShip(newShip)
  .pipe(
    catchError((err) => {
      console.log('error1');
      console.log(err);
      this.error = true;
      this.message = err.message;
      return [];
    }))
    .subscribe(
      (data) => {
        this.error = false;
        this.message = '';
        console.log('data');
        console.log(data);
        this._router.navigate(['/user/ship']);
        }
    )
  }
}
