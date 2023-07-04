import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import message from 'src/data/message';
import user from 'src/data/user';
import { LoggerService } from '../logger.service';
import { BackendService } from '../backend.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private _router: Router, private http: HttpClient, private loggerService: LoggerService, private backendService: BackendService) { }

  login() {
    console.log('login');
    this.backendService.login(this.username, this.password)
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
            this.loggerService.login(data);
            /*localStorage.setItem('token', data.payload.data.token);
            console.log('token set');
            console.log(localStorage.getItem('token'));
            this._router.navigate(['/logged']);*/
          }
        }
      )
  }

  createuser() {
    this._router.navigate(['/create']);
    }

}
