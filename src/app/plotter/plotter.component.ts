import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plotter',
  templateUrl: './plotter.component.html',
  styleUrls: ['./plotter.component.css']
})
export class PlotterComponent implements OnInit {
  private readonly data: any = [];
  private readonly fileReader: FileReader = new FileReader();
  private fileContents: string;

  constructor() {
    this.fileReader.onload = this.extractFileContents;
  }

  ngOnInit() {
  }

  public loadFile(event): void {
    this.fileReader.readAsText(event.target.files[0]);
  }

  private extractFileContents(contents: any): void {
    const result = contents.target.result;
    const lines = result.split(/\r?\n/);

    lines.forEach(line => {
      const lineContent = line.split(/\r?;/);

      console.log(line);

      const lineArray = [];

      lineContent.forEach(value => {
        console.log(value);
        lineArray.push(value);
      });

      this.data.push(lineArray);
    });

  }
}
