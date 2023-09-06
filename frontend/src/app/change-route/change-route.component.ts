import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ship } from 'src/data/ship';
import { BackendService } from '../backend.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-change-route',
  templateUrl: './change-route.component.html',
  styleUrls: ['./change-route.component.scss']
})
export class ChangeRouteComponent {
  constructor(
    public dialogRef: MatDialogRef<ChangeRouteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ship,
    private backend: BackendService
  ) {}

  protected routes: String[] = []
  protected selectedRoute: String = ""

  confirm(): void {
    console.log(this.selectedRoute);
    console.log(this.data.name);
    this.backend.updateRoutes(this.data.name, this.selectedRoute).subscribe(
      (data) => {
        this.dialogRef.close();
      }
    )
    
  }

  changeRoute(newRoute: String) {
    this.selectedRoute = newRoute;
  }

  ngOnInit() {
    this.backend.getAllRoutes()
    .pipe(
      catchError((err) => {
        console.log('error');
        console.log(err);
        return [];
      }))
      .subscribe(
        (data) => {
          console.log('data');
          console.log(data);
          this.routes = data.payload.map((route: any) => route.name as String);
        }
      )
   }
}
