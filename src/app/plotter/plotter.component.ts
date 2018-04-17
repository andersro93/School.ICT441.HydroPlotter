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
  public plotData: Plotdata;
  public raw_data: string;
  public plotVisible = false;
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
    const lines = this.raw_data.split(/\r?\n/);

    this.plotData = new Plotdata();

    let lineNumber = 0;
    let initial = true;

    lines.forEach(line => {
      const lineArray = line.split(/\r?;/);

      let value_number = 0;

      if (initial === true) {
        lineArray.forEach(value => {
          const state = new State();
          state.Name = value;

          this.plotData.States.push(state);

          initial = false;
        });
      } else {
        const timestep = new Timestep();

        timestep.Label = 'T' + lineNumber;

        lineArray.forEach(value => {
          const probability = new Probability();
          const state = this.plotData.States[value_number];

          probability.State = state;
          probability.Value = parseFloat(value);
          probability.Timestep = timestep;

          state.Probabilities.push(probability);

          timestep.Probabilities.push(probability);

          this.plotData.Probabilities.push(probability);

          value_number++;
        });

        lineNumber++;
        this.plotData.Timesteps.push(timestep);
      }
    });

    this.PlotEvent.emit({PlotData: this.plotData});
  }
}
