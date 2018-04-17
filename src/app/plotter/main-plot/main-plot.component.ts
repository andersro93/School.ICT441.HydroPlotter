import {Component, Input, OnDestroy, OnInit, EventEmitter} from '@angular/core';
import * as Plotly from 'plotly.js';
import {Plotdata} from '../../_models/plotdata';
import {PlotdataEvent} from '../../_events/plotdataEvent';

@Component({
  selector: 'app-main-plot',
  templateUrl: './main-plot.component.html',
  styleUrls: ['./main-plot.component.css']
})
export class MainPlotComponent implements OnInit, OnDestroy {

  @Input() private PlotEvent: EventEmitter<PlotdataEvent>;

  private PlotData: Plotdata;

  private Layout;

  private x_values: any[];

  private y_values: any[];

  private z_values: any[];

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
    this.createLayoutArray();

    this.createXArray();
    this.CreateYArray();
    this.createZArray();

    this.plotTheData();
  }

  private createLayoutArray() {
    this.Layout = {
      title: 'Main Plot',
      annotations: [],
      xaxis: {
        ticks: '',
        side: 'top'
      },
      yaxis: {
        ticks: '',
        ticksuffix: ' ',
        width: 700,
        height: 700,
        autosize: true
      }
    };
  }

  private plotTheData() {
    // noinspection TypeScriptValidateTypes
    Plotly.newPlot('main_plot', [{
      x: this.x_values,
      y: this.y_values,
      z: this.z_values,
      type: 'heatmap',
      colorscale: [[0, '#ffffff'], [1, '#FF0000']],
      showscale: true
    }], this.Layout);
  }

  private createZArray() {
    this.z_values = [];

    this.PlotData.States.forEach(state => {
      const stateArray = [];

      state.Probabilities.forEach(probability => {
        stateArray.push(probability.Value);
      });

      this.z_values.push(stateArray);
    });
  }

  private createXArray() {
    this.x_values = [];

    this.PlotData.Timesteps.forEach(timestep => {
      this.x_values.push(timestep.Label);
    });
  }

  private CreateYArray() {
    this.y_values = [];

    this.PlotData.States.forEach(state => {
      this.y_values.push(state.Name);
    });
  }
}
