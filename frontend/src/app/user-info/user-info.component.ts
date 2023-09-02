import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from '../logger.service';
import { BackendService } from '../backend.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {

  newUsername: string = '';
  newPassword: string = '';

  constructor(private _router: Router, private http: HttpClient, private loggerService: LoggerService, private backendService: BackendService) { }

  changePassword() {
    console.log('changePassword');
    this.backendService.changePassword(this.loggerService.user!!.data.username, this.newPassword)
    .pipe(
      catchError((err) => {
        console.log('error');
        console.log(err);
        return [];
      }))
      .subscribe(
        (data) => {
          console.log('data');
          }
      )
  }

  changeUsername() {
    console.log('changeUsername');
    this.backendService.changeUsername(this.loggerService.user!!.data.username, this.newUsername)
    .pipe(
      catchError((err) => {
        console.log('error');
        console.log(err);
        return [];
      }))
      .subscribe(
        (data) => {
          console.log('data');
          }
      )
  }

}
