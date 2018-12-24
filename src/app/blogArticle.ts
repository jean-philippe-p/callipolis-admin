import { BlogArticleElement } from './blogArticleElement';

export class BlogArticle {
  id: number;
  title: string;
  resume: string;
  image: string;
  blogArticleElements: BlogArticleElement[] = [];
}
