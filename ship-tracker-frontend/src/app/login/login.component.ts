import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import message from 'src/data/message';
import user from 'src/data/user';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private _router: Router, private http: HttpClient, private loggerService: LoggerService) { }

  login() {
    console.log('login');
    let credential = {username: this.username, password: this.password};
    this.http.get<message<user>>('http://localhost:3000/login/credentials/'+encodeURIComponent(JSON.stringify(credential)))
      .subscribe(
        (data) => {
          console.log(data);
          if(data.status === 'success') {
            this.loggerService.login(data.payload);
            /*localStorage.setItem('token', data.payload.data.token);
            console.log('token set');
            console.log(localStorage.getItem('token'));
            this._router.navigate(['/logged']);*/
          }
        }
      );
  }

  createuser() {
    this._router.navigate(['/create']);
    }

}
