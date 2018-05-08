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
import { MainPlotComponent } from './plotter/main-plot/main-plot.component';
import { PredictionPlotComponent } from './plotter/prediction-plot/prediction-plot.component';
import { StatsComponent } from './plotter/stats/stats.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    PlotterComponent,
    PageNotFoundComponent,
    MainPlotComponent,
    PredictionPlotComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
