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

  constructor(private _router: Router, private loggerService: LoggerService, private backendService: BackendService) {}
  
  ngOnInit() {
    this.update();
   }
   
  update() {
    this.backendService.getMyShips(this.loggerService.getUsername()!!)
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
