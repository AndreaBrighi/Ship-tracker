import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import message from '../data/message';
import user from '../data/user';
import { LoggerService } from './logger.service';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _router: Router, private http: HttpClient, private loggerService: LoggerService, private backendService: BackendService) { }

  title = 'ship tracker';

  ngOnInit() {
    if(localStorage.getItem('token') === null) {
      console.log('token not set');
      this._router.navigate(['/login']);
    }
    else{
      this.backendService.getuser(localStorage.getItem('token')!!)
      .subscribe(
        (data) => {
          console.log(data);
          if(data != null) {
            console.log('logged in');
            this.loggerService.login(data);
          }
          else {
            console.log('token expired');
            this._router.navigate(['/login']);
          }
          //localStorage.setItem('token', data.message);
          //console.log('token set');
        }
      );
    }
    let token = localStorage.getItem('token');
    console.log(token);
  }
}
