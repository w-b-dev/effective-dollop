export interface OriginalWpPost {
  id: number;
  date: string;
  sticky: boolean;
  link: string;
  featured_media: number;
  title: {rendered: string};
  content: {rendered: string};
  excerpt: {rendered: string};
  categories: any;
}
