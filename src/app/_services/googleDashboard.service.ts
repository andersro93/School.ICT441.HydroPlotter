import {Injectable} from '@angular/core';

@Injectable()
export class GoogleDashboardService {
  private fileContents: string;
  private data: any = [];

  constructor() {
    console.log('Google Dashboard service instance constructed!');
  }

  public parseFileContents(fileContents: string) {
    console.log('Starting file parser of content:', fileContents);

    this.parseContentsToArray(fileContents);
    this.fileContents = fileContents;

    console.log('File contents parsed');
  }

  public getAreaPlotData() {
    return this.data;
  }

  private parseContentsToArray(contents: string) {
    const lines = contents.split(/\r?\n/);

    lines.forEach(line => {
      const lineContent = line.split(/\r?;/);

      const lineArray = [];

      lineContent.forEach(value => {
        lineArray.push(value);
      });

      this.data.push(lineArray);
    });
  }
}
