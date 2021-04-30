import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Task } from '../entity/task';
import { Project } from '../entity/project';

import { MessageService } from '../service/message.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private taskListUrl = 'http://localhost:8080/api/projects/';
  private addTaskUrl = 'http://localhost:8080/api/tasks/add';

  tasks: Task[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Accept': 'application/json',
    'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Tasks from the server */
  getTasks(project: Project): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskListUrl + project.projectId + "/tasks");
  }  

  create(task: Task): Observable<any> {
    return this.http.post(this.addTaskUrl, task);
  }






  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`TaskService: ${message}`);
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
