import { Injectable } from '@angular/core';

import { MainService, Service } from './service';
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

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getNavBarElements(): Observable<any> {
    return this.http.get<any>(this.serviceUrl + '/Navbar?withFooterIntroduces=true')
    .map(res => {
        this.summary_services.splice(0, this.summary_services.length);
        for (let i = 0; i < res.services.length; i++) {
          this.summary_services.push(res.services[i]);
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

  getLogoUrl(serviceId: number): string {
    return this.serviceUrl + '/Logo/' + serviceId;
  }

}
