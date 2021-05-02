import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private usersUrl = 'api/users';
  private userByRoleUrl = 'http://localhost:8080/api/users/role/';

  users: User[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getUsersByRole(role: string): Observable<User[]> {
    return this.http.get<User[]>(this.userByRoleUrl + role);
  }
 

}
