import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoadFromWordpressService {

  constructor(private http: HttpClient) {
    // console.log('SERVICE CONSTRUCTOR');
  }

  getWordpressPosts(url: string) {
    // console.log('a - GET POSTS CALLED');
    url += 'posts?per_page=100';
    // console.log('b (TRANSFORMED URL) - ', url);
    return this.http.get<Array<Object>>(url);
  }
}
