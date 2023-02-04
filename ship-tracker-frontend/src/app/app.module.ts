import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoggedPageComponent } from './logged-page/logged-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ShipsMapComponent } from './ships-map/ships-map.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoggedPageComponent,
    PageNotFoundComponent,
    CreateUserComponent,
    ShipsMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
