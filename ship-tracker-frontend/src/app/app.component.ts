import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import message from '../data/message';
import user from '../data/user';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _router: Router, private http: HttpClient, private loggerService: LoggerService) { }

  title = 'ship tracker';

  ngOnInit() {
    if(localStorage.getItem('token') === null) {
      console.log('token not set');
      this._router.navigate(['/login']);
    }
    else{
      this.http.get<message<user>>('http://localhost:3000/login/token/'+ localStorage.getItem('token'))
      .subscribe(
        (data) => {
          console.log(data);
          if(data.status === 'success') {
            this.loggerService.login(data.payload);
          }
          else {
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
