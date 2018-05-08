import {Component, Input, OnDestroy, OnInit, EventEmitter} from '@angular/core';
import * as Plotly from 'plotly.js';
import {Plotdata} from '../../_models/plotdata';
import {PlotdataEvent} from '../../_events/plotdataEvent';

@Component({
  selector: 'app-prediction-plot',
  templateUrl: './prediction-plot.component.html',
  styleUrls: ['./prediction-plot.component.css']
})
export class PredictionPlotComponent implements OnInit, OnDestroy {

  @Input() private PlotEvent: EventEmitter<PlotdataEvent>;

  private PlotData: Plotdata;

  private series: any[];

  constructor() { }

  ngOnInit() {
    this.PlotEvent.subscribe(event => {
      this.PlotData = event.PlotData;

      this.runPlotting();
    });
  }

  ngOnDestroy(): void {
    this.PlotEvent.unsubscribe();
  }

  private runPlotting() {
    this.createSeries();

    this.plotTheData();
  }

  private createSeries(): void {
    const observations = {
      x: [],
      y: [],
      mode: 'lines',
      name: 'Observations'
    };
    const predictions = {
      x: [],
      y: [],
      mode: 'lines',
      name: 'Predictions'
    };

    this.PlotData.Timesteps.forEach(timestep => {
      observations.y.push(timestep.Observed);
      observations.x.push(timestep.Label);

      predictions.y.push(timestep.Predicted);
      predictions.x.push(timestep.Label);
    });

    this.series = [observations, predictions];
  }

  private plotTheData(): void {
    // noinspection TypeScriptValidateTypes
    Plotly.newPlot('prediction_plot', this.series);
  }

}
