import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MainServiceComponent } from './main-service/main-service.component';
import { SubServiceComponent } from './sub-service/sub-service.component';
import { IntroduceComponent } from './introduce/introduce.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'services/create', component: MainServiceComponent },
  { path: 'services/:id', component: MainServiceComponent },
  { path: 'services/:id/sub-services/create', component: SubServiceComponent },
  { path: 'services/:id/sub-services/:sub-id', component: SubServiceComponent },
  { path: 'introduces/:id', component: IntroduceComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
