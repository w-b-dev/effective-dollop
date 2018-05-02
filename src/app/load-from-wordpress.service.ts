import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OriginalWpPost } from "./data-classes/original-wp-post";
import { OriginalWpMedia } from "./data-classes/original-wp-media";

@Injectable()
export class LoadFromWordpressService {

  constructor(private http: HttpClient) {
    // console.log('SERVICE CONSTRUCTOR');
  }

  getWordpressPosts(url: string) {
    // console.log('a - GET POSTS CALLED');
    url += 'posts?per_page=100';
    // console.log('b (TRANSFORMED URL) - ', url);
    return this.http.get<Array<OriginalWpPost>>(url);
  }

  getWordpressMediaList(url: string) {
    url += 'media?per_page=100';
    return this.http.get<Array<OriginalWpMedia>>(url);
  }
}
