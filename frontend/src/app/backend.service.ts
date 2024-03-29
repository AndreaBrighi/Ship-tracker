import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import message from 'src/data/message';
import { user, userData } from 'src/data/user';
import { catchError, throwError } from 'rxjs';
import { ship } from 'src/data/ship';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl: String = 'http://backend:3000';

  constructor(
    private http: HttpClient,
  ) { }

    public login(username: String, password: String) {
      let credential = {username: username, password: password};
      return this.http.post<userData | undefined>(this.baseUrl + '/login/credentials/', credential)
        .pipe(
          catchError(this.handleError)
        );
    }

    public createuser(username: String, password: String) {
      let credential = {username: username, password: password};
      return this.http.post<message<user>>(this.baseUrl + '/login/register/', credential)
        .pipe(
          catchError(this.handleError)
        );
    }

    public getuser(token: String) {
      return this.http.get<user>(this.baseUrl + '/login/token/' + token)
        .pipe(
          catchError(this.handleError)
        );
    }

    public changePassword(username: String, password: String) {
      let credential = {username: username, password: password};
      return this.http.put<message<user>>(this.baseUrl + '/login/change/password', credential)
        .pipe(
          catchError(this.handleError)
        );
    }

    public changeUsername(username: String, newUsername: String) {
      let credential = {username: username, newusername: newUsername};
      return this.http.put<message<user>>(this.baseUrl + '/login/change/user', credential)
        .pipe(
          catchError(this.handleError)
        );
    }

    public getShips() {
      return this.http.get<ship[]>(this.baseUrl + '/shipreq/getall')
        .pipe(
          catchError(this.handleError)
        );
    }

    public getMyShips(user: String) {
      return this.http.get<ship[]>(this.baseUrl + '/shipreq/getallfor/' + user)
        .pipe(
          catchError(this.handleError)
        );
    }

    public getAllRoutes() {
      return this.http.get<any>(this.baseUrl + '/routereq/getall')
        .pipe(
          catchError(this.handleError)
        );
    }

    public addShip(ship: ship) {
      return this.http.post<ship[]>(this.baseUrl + '/shipreq/register' , ship)
        .pipe(
          catchError(this.handleError)
        );
    }

    public updateRoutes(ship: String, route: String) {
      return this.http.put<any>(this.baseUrl + '/shipreq/change/route', {
        shipname: ship,
        newroute: route
      })
        .pipe(
          catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
      if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
      }
      // Return an observable with a user-facing error message.
      return throwError(() => new Error(error.error));
    }
}
