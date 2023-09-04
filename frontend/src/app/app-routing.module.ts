import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ShipsMapComponent } from './ships-map/ships-map.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { WatcherHomepageComponent } from './watcher-homepage/watcher-homepage.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ShipsListComponent } from './ships-list/ships-list.component';
import { NewShipComponent } from './new-ship/new-ship.component';
import { ChatPageComponent } from './chat-page/chat-page.component';

const routes: Routes = [
  { path: 'map', component: ShipsMapComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'user', 
    component: UserHomepageComponent,
    children: [
      {
        path: 'user', // child route path
        component: UserInfoComponent, // child route component that the router renders
      },
      {
        path: 'ship',
        component: ShipsListComponent, // another child route component that the router renders
      },
      {
        path: 'newShip',
        component: NewShipComponent, // another child route component that the router renders
      },
      {
        path: 'map',
        component: ShipsMapComponent, // another child route component that the router renders
      },
      {
        path: 'chat/:contact',
        component: ChatPageComponent, // another child route component that the router renders
      }
    ]
  },
  {
    path: 'watcher',
    component: WatcherHomepageComponent,
    children: [
      {
        path: 'user', // child route path
        component: UserInfoComponent, // child route component that the router renders
      },
      {
        path: 'map',
        component: ShipsMapComponent, // another child route component that the router renders
      },
      {
        path: 'chat',
        component: ChatPageComponent, // another child route component that the router renders
      }]
  },
  { path: 'create', component: CreateUserComponent },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
