import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {PlotterComponent} from './plotter/plotter.component';

export const appRoutes = [
  { path: 'plotter', component: PlotterComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
