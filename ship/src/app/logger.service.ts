import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as e from 'express';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private _router: Router) { }

  user: String = "test1";

  getUsername() {
    return this.user;
  }
}
