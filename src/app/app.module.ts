import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service
import { AppComponent } from './app.component';
import { ProvidersComponent } from './providers/providers.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { RouterModule,RouterLink, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProviderDataService } from './provider-data.service';
import { LimitToPipe } from './limit-to.pipe';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { FormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'providers', component: ProvidersComponent },
  { path: 'favorites', component: FavoritesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProvidersComponent,
    FavoritesComponent,
    HomeComponent,
    LimitToPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    Ng2OrderModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [ProviderDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
