import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { coordinates } from 'src/data/coordinates';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl: String = 'http://backend:3000';

  constructor(
    private http: HttpClient,
  ) { }

    public updatePosition(ship: String, position: coordinates) {
      return this.http.put<any>(this.baseUrl + '/shipreq/change/position/', {
        shipname: ship,
        newposition: position
      })
        .pipe(
          catchError(this.handleError)
        );
    }

    public setAlarm(ship: String) {
      return this.http.put<any>(this.baseUrl + '/shipreq//change/toallarm/'+ship, {})
        .pipe(
          catchError(this.handleError)
        );
    }

    public setNormal(ship: String) {
      return this.http.put<any>(this.baseUrl + '/shipreq//change/tonormal/'+ship, {})
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
