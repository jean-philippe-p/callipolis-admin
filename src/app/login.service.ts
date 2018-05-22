import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { catchError, map, tap } from 'rxjs/operators';

declare var require: any
const MD5 = require('md5');

const httpServiceOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class LoginService {

  private serviceUrl: string = 'http://localhost/api';
  //private serviceUrl: string = 'https://www.callipolis-investigation.fr/api';

  public token: string;

  constructor(private http: HttpClient) { }

  login(name, password) {
    const request = {
      name: name,
      password: MD5(password)
    };
    console.log(request);
    return this.http.post<any>(this.serviceUrl + '/login', request, httpServiceOptions).map(
      res => {
        this.token = res.token;
        return this.token;
      }
    );
  }
}
