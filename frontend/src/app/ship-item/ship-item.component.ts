import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShipsMapComponent } from '../ships-map/ships-map.component';
import { ship } from 'src/data/ship';
import { ChangeRouteComponent } from '../change-route/change-route.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-ship-item',
  templateUrl: './ship-item.component.html',
  styleUrls: ['./ship-item.component.scss']
})
export class ShipItemComponent {
  
  @Input() ship!: ship
  @Output() update = new EventEmitter<any>();


  constructor(public dialog: MatDialog) {}

  editShip() {
    const dialogRef = this.dialog.open(ChangeRouteComponent, {
      data: this.ship,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.update.emit();
    });
  }

}
