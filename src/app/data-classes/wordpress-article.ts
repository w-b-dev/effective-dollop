export class WordpressArticle {
  _id: number;
  _sticky: boolean;
  _date: string;
  _link: string;
  _featuredmedia: number;
  _title_rendered: string;
  _htmlcontent_rendered: string;
  _htmlexcerpt_rendered: string;
  /* extract the integer stored on position array[0] below */
  _categories: number;
}
