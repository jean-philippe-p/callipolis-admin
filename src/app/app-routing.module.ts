import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MainServiceComponent } from './main-service/main-service.component';
import { SubServiceComponent } from './sub-service/sub-service.component';
import { IntroduceComponent } from './introduce/introduce.component';
import { ContactComponent } from './contact/contact.component';
import { CompanyComponent } from './company/company.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ArticleComponent } from './article/article.component';
import { BlogArticleComponent } from './blog-article/blog-article.component';
import { ArticleBlogListComponent } from './article-blog-list/article-blog-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactComponent },
  { path: 'services/create', component: MainServiceComponent },
  { path: 'services/:id', component: MainServiceComponent },
  { path: 'services/:id/sub-services/create', component: SubServiceComponent },
  { path: 'services/:id/sub-services/:sub-id', component: SubServiceComponent },
  { path: 'introduces/create', component: IntroduceComponent },
  { path: 'introduces/:id', component: IntroduceComponent },
  { path: 'carousel/create', component: CarouselComponent },
  { path: 'carousel/:id', component: CarouselComponent },
  { path: 'articles/create', component: ArticleComponent },
  { path: 'articles/:id', component: ArticleComponent },
  { path: 'companies/1', component: CompanyComponent },
  { path: 'blog/article/create', component: BlogArticleComponent },
  { path: 'blog/article/:id', component: BlogArticleComponent },
  { path: 'blog/articles', component: ArticleBlogListComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
