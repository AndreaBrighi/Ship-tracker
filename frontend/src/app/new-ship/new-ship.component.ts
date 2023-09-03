import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from '../logger.service';
import { BackendService } from '../backend.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-new-ship',
  templateUrl: './new-ship.component.html',
  styleUrls: ['./new-ship.component.scss']
})
export class NewShipComponent {
addShip() {
throw new Error('Method not implemented.');
}
newShipName: String = '';
routes: String[] = [];
latitude: number = 0.0;
longitude: number = 0.0;

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

}
