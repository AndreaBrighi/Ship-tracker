import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ShipsMapComponent } from './ships-map/ships-map.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { WatcherHomepageComponent } from './watcher-homepage/watcher-homepage.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ShipsListComponent } from './ships-list/ships-list.component';
import { ShipItemComponent } from './ship-item/ship-item.component';
import { ChatContactsComponent } from './chat-contacts/chat-contacts.component';
import { ChatComponent } from './chat/chat.component';
import { NewShipComponent } from './new-ship/new-ship.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from  '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    CreateUserComponent,
    ShipsMapComponent,
    UserHomepageComponent,
    WatcherHomepageComponent,
    UserInfoComponent,
    ShipsListComponent,
    ShipItemComponent,
    ChatContactsComponent,
    ChatComponent,
    NewShipComponent,
    ChatPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

