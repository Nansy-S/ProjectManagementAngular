import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Account } from '../entity/account';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  private userListUrl = 'http://localhost:8080/api/users/';
  private userByRoleUrl = 'http://localhost:8080/api/users/';

  accounts: Account[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.userListUrl);
  }

  getUsersByRole(role: string): Observable<Account[]> {
    return this.http.get<Account[]>(this.userByRoleUrl + role);
  }

}
