import { Component, DoCheck } from '@angular/core';

@Component( {
  selector: 'wordpresser-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
} )
export class AppComponent implements DoCheck {

  /* TODO: URL should be root format. The addition of '/wp-json/wp/v2/' is invisible to the user */
  url: string;
  perCat: number;
  // @Output() urlUpdated: EventEmitter<string> = new EventEmitter();

  constructor() {
    // this.url = 'https://mvc-ca-web-stag.azurewebsites.net/wp-json/wp/v2/';
    this.url = 'https://mvc-ca-web-stag.azurewebsites.net';
    // this.url = '';
    this.perCat = 2;
  }

  ngDoCheck() {
    if ( this.perCat < 1 ) {
      // Entered error mode
      console.warn( 'CANNOT CHANGE TO LOWER THAN 1!' );
      this.perCat = 1;
    }
  }

  // updateByTyping( $event: any ) {
  //   this.url = $event.target.value;
    // console.log( 'URL updateByTyping!', this.url );
  // }

  // updateByClicking() {
  //   console.log( 'URL updateByClicking!', this.url );
  //   this.urlUpdated.emit(this.url);
  // }
}
