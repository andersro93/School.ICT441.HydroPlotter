import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js';

@Component({
  selector: 'app-plotter',
  templateUrl: './plotter.component.html',
  styleUrls: ['./plotter.component.css']
})
export class PlotterComponent implements OnInit {
  public data: any[];
  public data_labels: string[];
  public raw_data: string;
  private readonly fileReader: FileReader = new FileReader();

  constructor() {
    this.data = [];
    this.fileReader.onloadend = (e) => {
      this.raw_data = this.fileReader.result;
    };
  }

  ngOnInit() {
  }

  public loadFile(event): void {
    this.fileReader.readAsText(event.target.files[0]);
  }

  public run_plot(): void {
    this.parseFileContent();

    // Create main plot
    const plotdata = [
      {
        z: this.data,
        type: 'heatmap'
      }
    ];

    // Main Plot
    Plotly.newPlot('main_plot', plotdata);
  }

  public parseFileContent(): void {
    const lines = this.raw_data.split(/\r?\n/);

    let linenumber = 0;

    lines.forEach(line => {
      const lineContent = line.split(/\r?;/);

      const lineArray = [];

      lineContent.forEach(value => {
        lineArray.push(parseFloat(value));
      });

      if (linenumber === 0) {
        this.data_labels = lineArray;
      } else {
        this.data.push(lineArray);
      }

      linenumber++;
    });
  }
}
