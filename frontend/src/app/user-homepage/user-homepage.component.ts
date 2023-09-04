import { Component } from '@angular/core';
import { LoggerService } from '../logger.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.scss']
})
export class UserHomepageComponent {

  constructor(private loggerService: LoggerService) { }

  logout() {
    this.loggerService.logout();
  }

}
