import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Project } from '../entity/project';

import { MessageService } from '../service/message.service';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  private projectListUrl = 'http://localhost:8080/api/projects/';
  private projectDetailUrl = 'http://localhost:8080/api/projects/';
  private addProjectUrl = 'http://localhost:8080/api/projects/add';

  projects: Project[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Accept': 'application/json',
    'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Projects from the server */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectListUrl).pipe(
      catchError(this.handleError<Project[]>('getProjects', []))
    );
  }

  /** GET Projects Detail from the server */
  getProjectDetail(id: number): Observable<Project> {
    return this.http.get<Project>(this.projectDetailUrl + id).pipe(
      catchError(this.handleError<Project>('getProject'))
    );
  }

  /** CREATE Project */
  create(project: Project): Observable<any> {
    return this.http.post(this.addProjectUrl, project);
  }


  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ProjectService: ${message}`);
  }

  /** Handle Http operation that failed */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
