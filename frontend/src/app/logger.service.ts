import { Injectable } from '@angular/core';
import user from '../data/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private _router: Router) { }

  user: user | undefined = undefined;

  login(user: user) {
    this.user = user;
    sessionStorage.setItem('token', user.data.token);
    this._router.navigate(['/logged']);
    console.log('logged in');
  }

  logout() {
    this.user = undefined;
    sessionStorage.removeItem('token');
    this._router.navigate(['/login']);
    console.log('logged out');
  }
}
