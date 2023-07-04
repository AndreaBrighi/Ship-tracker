import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoggedPageComponent } from './logged-page/logged-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ShipsMapComponent } from './ships-map/ships-map.component';

const routes: Routes = [
  { path: 'map', component: ShipsMapComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'logged', 
    component: LoggedPageComponent,
    children: [
      {
        path: 'user', // child route path
        component: LoginComponent, // child route component that the router renders
      },
      {
        path: 'ship',
        component: LoginComponent, // another child route component that the router renders
      },
      {
        path: 'chat',
        component: LoginComponent, // another child route component that the router renders
      }
    ]
  },
  { path: 'create', component: CreateUserComponent },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
