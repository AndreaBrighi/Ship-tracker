import { Component } from '@angular/core';
import { LoggerService } from './logger.service';
import { BackendService } from './backend.service';
import { coordinates } from 'src/data/coordinates';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  protected ship = this.logger.getUsername();
  protected alertStatus = false;
  private position: coordinates = {
    longitude: 12.584871059650707,
    latitude: 44.02492804269789
  };
  id: any;
  
  constructor(private logger: LoggerService, private backend: BackendService) { }

  changeStatus() {
    this.alertStatus = !this.alertStatus;
    if (this.alertStatus) {
      this.backend.setAlarm(this.logger.getUsername()).subscribe();
    }
    else {
      this.backend.setNormal(this.logger.getUsername()).subscribe();
    }
  }

  ngOnInit() {
    this.id = setInterval((): void => {
      this.position.latitude += 0.1;
      this.position.longitude += 0.1;
      console.log(this.position);
     this.backend.updatePosition(this.logger.getUsername(), this.position).subscribe();
    }, 2000);
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
