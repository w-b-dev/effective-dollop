import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { WordpressArticle } from '../data-classes/wordpress-article';
import { WordpressMedia } from '../data-classes/wordpress-media';
import { LoadFromWordpressService } from "../load-from-wordpress.service";

@Component( {
  selector: 'wordpresser-articles-listing',
  templateUrl: 'articles-listing.html',
  styleUrls: [ 'articles-listing.scss' ],
  providers: [ LoadFromWordpressService ]
} )

export class ArticlesListingComponent implements OnInit {

  @Input() url: string;
  @Input() perCat: number;
  articles: Array<WordpressArticle> = [];
  medias: Array<WordpressMedia> = [];
  outputArray: Array<WordpressArticle> = [];

  constructor( private loadFromWordpressService: LoadFromWordpressService ) { }

  ngOnInit() {
    this.matchWpCallToArrays( this.url );
  }

  preSelectArticles( input: Array<WordpressArticle>, perCat ) {
    let counter = [];
    input.forEach( ( value, index, nInput ) => {

      if ( value._categories !== undefined && value._categories !== null ) {
        if ( counter[ value._categories ] !== undefined && counter[ value._categories ] !== null ) {
          if ( counter[ value._categories ] < perCat ) {
            counter[ value._categories ]++;
            this.outputArray.push( value );
          }
        } else {
          counter[ value._categories ] = 1;
          this.outputArray.push( value );
        }
      }
    } );
  }

  getImageUrl( mediaId: number ) {
    let sourceUrl = '';
    this.medias.forEach( element =>
      element._id === mediaId ? sourceUrl = element._guid_rendered : null );
    return sourceUrl;
  }

  matchWpCallToArrays( url: string ) {
    if ( url === '' ) {
      console.log( url, 'Do not move anything.' );
    } else {
      url += '/wp-json/wp/v2/';
      console.log( url );

      this.loadFromWordpressService.getWordpressMediaList( url )
        .subscribe( data => {
          data.forEach( ( element, index, array ) => {
            this.medias.push( {
              _id: element.id,
              _guid_rendered: element.guid.rendered,
              _title_rendered: element.title.rendered,
              _caption_rendered: element.caption.rendered,
              _post: element.post
            } );
          } );
        } );

      this.loadFromWordpressService.getWordpressPosts( url )
        .subscribe( data => {
          data.forEach( ( element, index, array ) => {
            this.articles.push( {
              _categories: element.categories[ 0 ],
              _id: element.id,
              _link: element.link,
              _title_rendered: element.title.rendered,
              _sticky: element.sticky,
              _featuredmedia: element.featured_media,
              _date: element.date,
              _htmlexcerpt_rendered: element.excerpt.rendered,
              _htmlcontent_rendered: element.content.rendered
            } );
          } );

          this.preSelectArticles( this.articles, this.perCat );

        } );
    }
  }
}
