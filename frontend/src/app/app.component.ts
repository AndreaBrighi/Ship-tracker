import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from './logger.service';
import { BackendService } from './backend.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _router: Router, private loggerService: LoggerService, private backendService: BackendService) { }

  title = 'ship tracker';

  ngOnInit() {
    if(this.loggerService.getToken() == null) {
      console.log('token not set');
      this._router.navigate(['/login']);
    }else{
      const token = this.loggerService.getToken()!!;
      this.backendService.getuser(token)
      .pipe(
        catchError((err) => {
          this._router.navigate(['/login']);
          return [];
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
          if(data != null) {
            console.log('logged in');
            console.log(data);
            this.loggerService.login(data);
          }
          else {
            console.log('token expired');
            this._router.navigate(['/login']);
          }
        }
      );
    }
  }
}
