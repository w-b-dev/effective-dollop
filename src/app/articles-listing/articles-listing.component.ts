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

  medias: Array<WordpressMedia> = [
    {
      _id: 91,
      _guid_rendered: 'https://mvc-ca-web-stag.azurewebsites.net/wp-content/uploads/2018/05/cannabis-drug-relapse.jpg',
      _title_rendered: 'IMG title',
      _caption_rendered: 'IMG caption',
      _post: 98908,
    },
    {
      _id: 92,
      _guid_rendered: 'https://mvc-ca-web-stag.azurewebsites.net/wp-content/uploads/2018/04/cannabis-essential-oil.jpg',
      _title_rendered: 'IMG title',
      _caption_rendered: 'IMG caption',
      _post: 98908,
    },
    {
      _id: 93,
      _guid_rendered: 'https://mvc-ca-web-stag.azurewebsites.net/wp-content/uploads/2018/04/medical-cannabis-tolerance.jpg',
      _title_rendered: 'IMG title',
      _caption_rendered: 'IMG caption',
      _post: 98908,
    },
  ];

  outputArray: Array<WordpressArticle> = [];

  constructor( private loadFromWordpressService: LoadFromWordpressService ) { }

  ngOnInit() {
    // console.log('ROOT URL PASSED TO THE COMPONENT: ', this.url);
    let result = {};
    this.loadFromWordpressService.getWordpressPosts(this.url)
      .subscribe( data => {
        result = data;
        data.forEach((element, index, array) => {
          this.articles.push({
            _categories: element.categories[0],
            _id: element.id,
            _link: element.link,
            _title_rendered: element.title.rendered,
            _sticky: element.sticky,
            _featuredmedia: element.feature_media,
            _date: element.date,
            _htmlexcerpt_rendered: element.excerpt.rendered,
            _htmlcontent_rendered: element.content.rendered
          });
        });
        // console.log('LINE 66');
        // console.log(this.articles);
        this.preSelectArticles( this.articles );
      });

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
