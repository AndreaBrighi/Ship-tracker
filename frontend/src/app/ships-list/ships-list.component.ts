import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from '../logger.service';
import { BackendService } from '../backend.service';
import { catchError } from 'rxjs';
import { ship } from 'src/data/ship';

@Component({
  selector: 'app-ships-list',
  templateUrl: './ships-list.component.html',
  styleUrls: ['./ships-list.component.scss']
})
export class ShipsListComponent {

  ships = new Array<ship>(0);

  constructor(private _router: Router, private http: HttpClient, private loggerService: LoggerService, private backendService: BackendService) {
    this.backendService.getMyShips(loggerService.user!!.data.username)
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
          if(data !==  undefined) {
            this.ships = data;
          }
        }
      )
   }

}
