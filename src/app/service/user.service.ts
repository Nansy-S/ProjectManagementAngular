import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userByRoleUrl = 'http://localhost:8080/api/users/role/';
  private userByEmailUrl = 'http://localhost:8080/api/users/email/';
  private userDetailUrl = 'http://localhost:8080/api/users/';
  private addUserUrl = 'http://localhost:8080/api/users/add';

  users: User[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getUsersByRole(role: string): Observable<User[]> {
    return this.http.get<User[]>(this.userByRoleUrl + role);
  }
 
  /** GET User Detail from the server */
  getUserDetail(id: number): Observable<User> {
    return this.http.get<User>(this.userDetailUrl + id).pipe(
      map((user: User) => {
        console.log(user);
        return user;
      }));
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.userByEmailUrl + email);
  }

  /** CREATE User */
  create(user: User): Observable<any> {
    return this.http.post(this.addUserUrl, user);
  }
}
