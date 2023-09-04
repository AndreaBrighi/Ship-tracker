import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from '../logger.service';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  password: string = '';
  username: string = '';
  hide= true;
  error = false;
  message = '';

  constructor(private _router: Router, private loggerService: LoggerService, private backend: BackendService) { }
   
  createuser() {
    console.log('createuser');
    this.backend.createuser(this.username, this.password)
    .subscribe(
      (data) => {
        console.log(data);
        if(data.status === 'success') {
          console.log('token set');
          this.loggerService.login(data.payload);
        }
        else {
          console.log(data);
          this.error = true;
          this.message = data.message;
        }
      }
    );
    console.log(this.username);
    console.log(this.password);
  }

  goBack() {
    this._router.navigate(['/login']);
    }
  

}
