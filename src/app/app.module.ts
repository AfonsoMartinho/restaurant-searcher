import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// Import for API
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { LoaderComponent } from './components/loader/loader.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { PaginationComponent } from './components/pagination/pagination.component';
@NgModule({
  declarations: [
    AppComponent,
    RestaurantCardComponent,
    LoaderComponent,
    EmptyStateComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    // Import for API requests
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
