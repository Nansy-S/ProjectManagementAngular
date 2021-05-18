import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { LoginInfo } from '../login/login-info';

const loginUrl = 'http://localhost:8080/api/login';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient) { }

  login(credentials: LoginInfo): Observable<any> {
    console.log(credentials);
    return this.http.post(loginUrl, {
      email: credentials.email,
      password: credentials.password,
    });
  }
}
