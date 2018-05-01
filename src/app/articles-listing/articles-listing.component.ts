import { Component, Input, OnInit } from '@angular/core';
import { WordpressArticle } from '../data-classes/wordpress-article';
import { WordpressMedia } from '../data-classes/wordpress-media';

@Component( {
  selector: 'wordpresser-articles-listing',
  templateUrl: 'articles-listing.html',
  styleUrls: [ 'articles-listing.scss' ]
} )
export class ArticlesListingComponent {

  @Input() url: string;
  @Input() perCat: number;

  articles: Array<WordpressArticle> = [
    {
      _id: -1,
      _categories: 1,
      _featuredmedia: 91,
      _sticky: false,
      _title_rendered: 'That is my title',
      _link: 'werewrewrrwrr',
      _date: '-17686786',
      _htmlcontent_rendered: '<div>NOTHING</div>',
      _htmlexcerpt_rendered: '<div>NONE HERE</div>',
    },
    {
      _id: -2,
      _categories: 1,
      _featuredmedia: 92,
      _sticky: false,
      _title_rendered: 'I do not have a title',
      _link: 'asdasdasdasdas',
      _date: '-135465',
      _htmlcontent_rendered: '<div>NOTHING</div>',
      _htmlexcerpt_rendered: '<div>NONE HERE</div>',
    }, {
      _id: -3,
      _categories: 1,
      _featuredmedia: 93,
      _sticky: false,
      _title_rendered: 'I do not have a title',
      _link: 'asdasdasdasdas',
      _date: '-135465',
      _htmlcontent_rendered: '<div>NOTHING</div>',
      _htmlexcerpt_rendered: '<div>NONE HERE</div>',
    }, {
      _id: -4,
      _categories: 2,
      _featuredmedia: 94,
      _sticky: false,
      _title_rendered: 'I do not have a title',
      _link: 'asdasdasdasdas',
      _date: '-135465',
      _htmlcontent_rendered: '<div>NOTHING</div>',
      _htmlexcerpt_rendered: '<div>NONE HERE</div>',
    }, {
      _id: -5,
      _categories: 3,
      _featuredmedia: 95,
      _sticky: false,
      _title_rendered: 'I do not have a title',
      _link: 'asdasdasdasdas',
      _date: '-135465',
      _htmlcontent_rendered: '<div>NOTHING</div>',
      _htmlexcerpt_rendered: '<div>NONE HERE</div>',
    }, {
      _id: -6,
      _categories: undefined,
      _featuredmedia: 96,
      _sticky: false,
      _title_rendered: 'I do not have a title',
      _link: 'asdasdasdasdas',
      _date: '-135465',
      _htmlcontent_rendered: '<div>NOTHING</div>',
      _htmlexcerpt_rendered: '<div>NONE HERE</div>',
    },
  ];

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

  postsLoadedPerCategory = [
    { category: 1000 },
    { category: 2000 },
    { category: 3000 },
  ];

  constructor() {
    this.preSelectArticles( this.articles );
  }


  loadOneMorePost( category: number ) {
    console.log( 'category passed: ', category );
    this.postsLoadedPerCategory.forEach( element => {
      // console.log( element );
      if ( element.category === category ) {
        return true;
        // console.log( 'Category: ' + category + ' already exists. Item count: ' + this.postsLoadedPerCategory.length );
      } else {
        return false;
        // console.log( 'Has NOT property: ' + category );
        // console.log( 'Adding now...' );
        // this.postsLoadedPerCategory.push( { category: 1 } );
      }
    } );
  }

  preSelectArticles( input: Array<WordpressArticle> ) {
    let outputArray: Array<WordpressArticle>;

    let counter = [];

    input.forEach( nInput => {
      /*First if checks the input array for valid info*/
      if ( nInput._categories !== undefined && nInput._categories !== null ) {
        /*Now the data is ok, let's see if we already have this category registered somewhere*/
        if ( counter[ nInput._categories ] !== undefined && counter[ nInput._categories ] !== null ) {
          console.log( 'DATA EXISTS.', counter[ nInput._categories ] );
          /*TODO: The idea is to check the array for elements' existence
           * and increase the counter
           * The POST that was retrieved and checked should be sent to the new OUTPUT array*/
          let quantity = counter[ nInput._categories ];
          if ( quantity < 2 ) {
            quantity++;
            counter[ nInput._categories ] = quantity;
          }
          console.log( counter );
        } else {
          /*OK, we didn't have the data, so let's it*/
          counter.splice( nInput._categories, 0, nInput._categories );
          console.log( 'DATA DOES NOT EXIST.' );
          console.log( 'DATA ADDED.' );
          console.log( counter );
        }
      } else {
        /*If the input array has no valid data, report*/
        console.log( nInput._id + 'has no CATEGORY defined.' );
        console.log( 'REJECT this post!' );
      }
    } )
    // return outputArray;
  }

  getImageUrl( mediaId: number ) {
    let sourceUrl = '';
    this.medias.forEach( element =>
      element._id === mediaId ? sourceUrl = element._guid_rendered : null );
    return sourceUrl;
  }

}
