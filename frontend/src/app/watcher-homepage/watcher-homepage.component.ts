import { Component } from '@angular/core';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-watcher-homepage',
  templateUrl: './watcher-homepage.component.html',
  styleUrls: ['./watcher-homepage.component.scss']
})
export class WatcherHomepageComponent {

  constructor(private loggerService: LoggerService) { }

  logout() {
    this.loggerService.logout();
  }

}
