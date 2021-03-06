import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from './/app-routing.module';
import { MainServiceComponent } from './main-service/main-service.component';
import { SubServiceComponent } from './sub-service/sub-service.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ServiceService } from './service.service';
import { LoginService } from './login.service';
import { GenericService } from './generic.service';
import { IntroduceComponent } from './introduce/introduce.component';
import { ContactComponent } from './contact/contact.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CompanyComponent } from './company/company.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ArticleComponent } from './article/article.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { BlogArticleComponent } from './blog-article/blog-article.component';
import { ArticleBlogListComponent } from './article-blog-list/article-blog-list.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainServiceComponent,
    SubServiceComponent,
    HomeComponent,
    LoginComponent,
    IntroduceComponent,
    ContactComponent,
    CompanyComponent,
    CarouselComponent,
    ArticleComponent,
    SafeHtmlPipe,
    BlogArticleComponent,
    ArticleBlogListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [ServiceService, LoginService, GenericService],
  bootstrap: [AppComponent]
})
export class AppModule { }
