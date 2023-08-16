import { Injectable } from '@angular/core';
import user from '../data/user';
import { Router } from '@angular/router';
import * as e from 'express';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private _router: Router) { }

  user: user | undefined = undefined;

  login(user: user) {
    this.user = user;
    sessionStorage.setItem('token', user.data.token);
    if(user.data.userType === 'user'){
      this._router.navigate(['/user']);
    }else if(user.data.userType === 'controller'){
      this._router.navigate(['/watcher']);
    }
    console.log('logged in');
  }

  logout() {
    this.user = undefined;
    sessionStorage.removeItem('token');
    this._router.navigate(['/login']);
    console.log('logged out');
  }
}
