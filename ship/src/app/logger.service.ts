import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as e from 'express';
import { user } from 'src/data/user';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private _router: Router) { }

  user: user | undefined = undefined;

  login(user: user) {
    this.user = user;
    localStorage.setItem('token', user.token);
    localStorage.setItem('username', user.username);
    if(user.userType === 'user'){
      this._router.navigate(['/user/ship']);
    }else if(user.userType === 'controller'){
      this._router.navigate(['/watcher']);
    }
    console.log('logged in');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this._router.navigate(['/login']);
    console.log('logged out');
  }
}
