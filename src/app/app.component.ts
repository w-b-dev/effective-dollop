import { Component } from '@angular/core';

@Component( {
  selector: 'wordpresser-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent {
  /* TODO: URL should be root format. The addition of '/wp-json/wp/v2/' is invisible to the user */
  url = 'https://mvc-ca-web-stag.azurewebsites.net/wp-json/wp/v2/';
  perCat = 2;
}
