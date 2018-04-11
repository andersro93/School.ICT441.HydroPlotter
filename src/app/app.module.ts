import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { PlotterComponent } from './plotter/plotter.component';

import {appRoutes} from './app.routes';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GoogleDashboardService } from './_services/googleDashboard.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    PlotterComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ GoogleDashboardService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
