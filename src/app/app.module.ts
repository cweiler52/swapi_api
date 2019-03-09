import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeopleComponent } from './people/people.component';
import { SearchComponent } from './search/search.component';
import { ShipsComponent } from './ships/ships.component';
import { FilmsComponent } from './films/films.component';

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    SearchComponent,
    ShipsComponent,
    FilmsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
