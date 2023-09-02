import { Component, Input } from '@angular/core';
import { ShipsMapComponent } from '../ships-map/ships-map.component';
import { ship } from 'src/data/ship';

@Component({
  selector: 'app-ship-item',
  templateUrl: './ship-item.component.html',
  styleUrls: ['./ship-item.component.scss']
})
export class ShipItemComponent {
  
  @Input() ship!: ship

}
