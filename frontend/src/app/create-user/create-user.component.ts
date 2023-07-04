import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import message from 'src/data/message';
import user from 'src/data/user';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  password: string = '';
  username: string = '';

  constructor(private _router: Router, private http: HttpClient, private loggerService: LoggerService) { }

  ngOnInit() { }
   
  createuser() {
    console.log('createuser');
    this.http.put<message<user>>('http://localhost:3000/login/register', {username: this.username, password: this.password})
    .subscribe(
      (data) => {
        console.log(data);
        if(data.status === 'success') {
          console.log('token set');
          this.loggerService.login(data.payload);
         
        }
      }
    );
    console.log(this.username);
    console.log(this.password);
  }
  

}
