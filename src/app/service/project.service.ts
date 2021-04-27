import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Project } from '../entity/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private userListUrl = 'http://localhost:8080/api/projects/';

  projects: Project[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.userListUrl);
  }

}
