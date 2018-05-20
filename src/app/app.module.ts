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


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainServiceComponent,
    SubServiceComponent,
    HomeComponent,
    LoginComponent
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
  providers: [ServiceService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
