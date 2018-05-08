import {Component, EventEmitter, OnInit} from '@angular/core';
import {Plotdata} from '../_models/plotdata';
import {State} from '../_models/state';
import {Probability} from '../_models/probability';
import {Timestep} from '../_models/timestep';
import {PlotdataEvent} from '../_events/plotdataEvent';

@Component({
  selector: 'app-plotter',
  templateUrl: './plotter.component.html',
  styleUrls: ['./plotter.component.css']
})
export class PlotterComponent implements OnInit {
  public raw_data: string;
  private readonly fileReader: FileReader = new FileReader();

  public PlotEvent: EventEmitter<PlotdataEvent> = new EventEmitter();

  constructor() {
    this.fileReader.onloadend = (e) => {
      this.raw_data = this.fileReader.result;
    };
  }

  ngOnInit() {
  }

  public loadFile(event): void {
    this.fileReader.readAsText(event.target.files[0]);
  }

  public parseFileContent(): void {
    const raw_object = JSON.parse(this.raw_data);

    const plotData: Plotdata = new Plotdata();
    const states: State[] = [];

    // Find all the states first and create an array with them
    for (const probability of raw_object.t0.Probabilities) {
      const state = new State();
      state.Name = probability.state;
      states.push(state);
    }

    plotData.States = states;

    Object.keys(raw_object).forEach(timestep_key => {
        const timestep: Timestep = new Timestep();
        timestep.Predicted = raw_object[timestep_key].Predicted;
        timestep.Observed = raw_object[timestep_key].Observed;
        timestep.Label = timestep_key;

        for (const probability_raw of raw_object[timestep_key].Probabilities) {
          const probability: Probability = new Probability();

          probability.Timestep = timestep;
          probability.Value = probability_raw.value;

          const state = states.find(x => x.Name === probability_raw.state);
          probability.State = state;

          state.Probabilities.push(probability);
          timestep.Probabilities.push(probability);
          plotData.Probabilities.push(probability);
        }

        plotData.Timesteps.push(timestep);
      });

    this.PlotEvent.emit({
      PlotData: plotData
    });
  }
}
