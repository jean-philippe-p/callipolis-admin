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

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getNavBarElements(): Observable<any> {
    return this.http.get<MainService[]>(this.serviceUrl + '/Navbar');
  }

  getServices(): Observable<MainService[]> {
    return this.http.get<MainService[]>(this.serviceUrl + '/MainServices');
  }

  getService(id: number): Observable<MainService> {
    let service: MainService;

    return this.http.get<MainService>(this.serviceUrl + '/MainService/' + id).map(
      service_res => {
        service = service_res;
        return service;
      }
    )/*.mergeMap(() =>  this.http.get<Service[]>(this.serviceUrl + '/SubServices/' + id))
    .map(sub_services => {
        service.subServices = sub_services;
        return service;
      }
    )*/;
  }

  getSubService(id: number): Observable<Service> {
    return this.http.get<Service>(this.serviceUrl + '/SubService/' + id);
  }

  setService(service: MainService): Observable<MainService> {
    return this.http.post<MainService>(this.serviceUrl + '/MainService?token=' + this.loginService.token, service, httpServiceOptions);
  }

  setSubService(subService: Service): Observable<Service> {
    return this.http.post<Service>(this.serviceUrl + '/SubService?token=' + this.loginService.token, subService, httpServiceOptions);
  }

  uploadLogo(formData: FormData): Observable<any> {
    return this.http.post<MainService>(this.serviceUrl + '/upload/Logo?token=' + this.loginService.token, formData);
  }

  getLogoUrl(serviceId: number): string {
    return this.serviceUrl + '/Logo/' + serviceId;
  }

}
