import { Component, Input, OnInit } from '@angular/core';
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

  constructor( private loadFromWordpressService: LoadFromWordpressService ) {
  }

  ngOnInit() {
    // console.log('ROOT URL PASSED TO THE COMPONENT: ', this.url);
    this.loadFromWordpressService.getWordpressMediaList( this.url )
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

    this.loadFromWordpressService.getWordpressPosts( this.url )
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
        // console.log('LINE 66');
        // console.log(this.articles);
        this.preSelectArticles( this.articles );
      } );
  }

  preSelectArticles( input: Array<WordpressArticle> ) {
    // console.log( '******** Starts filtering the INPUT array' );
    let counter = [];

    input.forEach( ( value, index, nInput ) => {

      /*First if checks the input array for valid info*/
      if ( value._categories !== undefined && value._categories !== null ) {

        /*Now the data is ok, let's see if we already have this category registered somewhere*/
        if ( counter[ value._categories ] !== undefined && counter[ value._categories ] !== null ) {
          // Check the counter (less than 2) and increase it
          if ( counter[ value._categories ] < this.perCat ) {
            counter[ value._categories ]++;
            // At the same time the 'post/article' is sent to the new OUTPUT array
            this.outputArray.push( value );
            // console.log( index + ': Increased counter for ' + value._categories + '____ final:' + counter[ value._categories ] );
          } else {
            // console.log( index + ': Already full for category ' + value._categories + '____ final:' + counter[ value._categories ] );
          }
        } else {
          /*OK, we didn't have the data, so let's add it*/
          counter[ value._categories ] = 1;
          this.outputArray.push( value );
          // console.log( index + ': First insertion for ' + value._categories + '____ final:' + counter[ value._categories ] );
        }
      } else {
        /*If the input array has no valid data, report*/
        // console.log( index, value._id + ' has no CATEGORY defined. REJECT' );
      }
    } );

    // console.log( '******** Finished generating the OUTPUT array' );
    // console.log( this.outputArray );
  }

  getImageUrl( mediaId: number ) {
    let sourceUrl = '';
    this.medias.forEach( element =>
      element._id === mediaId ? sourceUrl = element._guid_rendered : null );
    return sourceUrl;
  }

}
