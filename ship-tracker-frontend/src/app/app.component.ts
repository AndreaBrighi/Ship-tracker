import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _router: Router) { }

  title = 'ship tracker';

  ngOnInit() {
    if(localStorage.getItem('token') === null) {
      this._router.navigate(['/login']);
      localStorage.setItem('token', '1234567890');
      console.log('token set');
    }
    else{
      this._router.navigate(['/logged']);
    }
    let token = localStorage.getItem('token');
    console.log(token);
  } 
}
