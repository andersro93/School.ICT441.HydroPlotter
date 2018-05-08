import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import {Plotdata} from '../../_models/plotdata';
import {PlotdataEvent} from '../../_events/plotdataEvent';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, OnDestroy {

  @Input() private PlotEvent: EventEmitter<PlotdataEvent>;

  public RootMinSquareError: Number;

  private PlotData: Plotdata;

  constructor() { }

  ngOnInit() {
    this.PlotEvent.subscribe(event => {
      this.PlotData = event.PlotData;

      this.calculateRootMeanSquareError();
    });
  }

  ngOnDestroy(): void {
    this.PlotEvent.unsubscribe();
  }

  private calculateRootMeanSquareError(): void {

    let deviation_sum = 0;
    let observations = 0;

    this.PlotData.Timesteps.forEach(timestep => {
      deviation_sum += (Number(timestep.Predicted) - Number(timestep.Observed)) ** 2;
      observations++;
    });

    if (observations === 0) {
      this.RootMinSquareError = 0;
      return;
    }

    this.RootMinSquareError = Math.sqrt(deviation_sum / (observations - 1));
  }
}
