import { Component } from '@angular/core';

@Component( {
  selector: 'wordpresser-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
} )
export class AppComponent {

  url: string;
  perCat: number;

  constructor() {
    this.url = 'https://mvc-ca-web-stag.azurewebsites.net';
    this.perCat = 1;
  }
}
