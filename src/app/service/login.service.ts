import { Injectable, Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Account } from '../entity/account';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private loginUrl = 'http://localhost:8080/login';
  
  account!: Account;
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(): Observable<Account> {
    const account = this.http.get<Account>(this.loginUrl);
    return account;
  }
}
