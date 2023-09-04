import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  hide = true;
  error = false;
  message = '';

  constructor(private _router: Router, private http: HttpClient, private loggerService: LoggerService, private backendService: BackendService) { }

  login() {
    console.log('login');
    console.log(this.username);
    console.log(this.password);
    this.backendService.login(this.username, this.password)
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
          console.log('data');
          console.log(data);
          if(data !==  undefined) {
            this.error = false;
            this.loggerService.login(data.data);
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
