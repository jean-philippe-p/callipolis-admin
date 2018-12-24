import { Component, OnInit } from '@angular/core';
import { GenericService } from '../generic.service';
import { BlogArticle } from '../blogArticle';

@Component({
  selector: 'app-article-blog-list',
  templateUrl: './article-blog-list.component.html',
  styleUrls: ['./article-blog-list.component.css']
})
export class ArticleBlogListComponent implements OnInit {

  blogArticles: BlogArticle[] = [];

  constructor(private genericService: GenericService) { }

  ngOnInit() {
    let params = {
      order: JSON.stringify([{
        property: 'id',
        type: 'DESC'
      }])
    }
    this.genericService.getResources('BlogArticles', params).subscribe(blogArticles => {
      this.blogArticles = blogArticles;
    });
  }

}
