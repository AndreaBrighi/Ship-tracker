import { Component } from '@angular/core';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-logged-page',
  templateUrl: './logged-page.component.html',
  styleUrls: ['./logged-page.component.scss']
})
export class LoggedPageComponent {
  constructor(private loggerService: LoggerService) { }

  logout() {
    this.loggerService.logout();
  }

}
