import { Injectable } from '@angular/core';

import { MainService, Service } from './service';
import { Introduce } from './introduce';
import { CarouselPart } from './carousel-part';
import { Article } from './article';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginService } from './login.service';

const httpServiceOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class ServiceService {

  private serviceUrl: string = 'https://www.callipolis-investigation.fr/api';
  public summary_services: MainService[] = [];
  public introduces: Introduce[] = [];
  public carousel: CarouselPart[] = [];
  public articles: Article[] = [];

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getNavBarElements(): Observable<any> {
    return this.http.get<any>(this.serviceUrl + '/Navbar?display=["footer"]&carousel=true&articles=true')
    .map(res => {
        this.summary_services.splice(0, this.summary_services.length);
        for (let i = 0; i < res.services.length; i++) {
          this.summary_services.push(res.services[i]);
        }
        this.introduces.splice(0, this.introduces.length);
        for (let i = 0; i < res.introduces.length; i++) {
          this.introduces.push(res.introduces[i]);
        }
        this.carousel.splice(0, this.carousel.length);
        for (let i = 0; i < res.carousel.length; i++) {
          this.carousel.push(res.carousel[i]);
        }
        this.articles.splice(0, this.articles.length);
        for (let i = 0; i < res.articles.length; i++) {
          this.articles.push(res.articles[i]);
        }
        return res;
    });
  }

  getServices(): Observable<MainService[]> {
    return this.http.get<MainService[]>(this.serviceUrl + '/MainServices');
  }

  uploadLogo(formData: FormData): Observable<any> {
    return this.http.post<MainService>(this.serviceUrl + '/upload/Logo?token=' + this.loginService.token, formData);
  }

  getLogoUrl(serviceId: string): string {
    return this.serviceUrl + '/Logo/' + serviceId;
  }

}
