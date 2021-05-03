import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from '../entity/task';
import { Project } from '../entity/project';

import { MessageService } from '../service/message.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private taskListByProjectUrl = 'http://localhost:8080/api/projects/';
  private taskListByReporterUrl = 'http://localhost:8080/api/reporter/';
  private taskListByAssigneeUrl = 'http://localhost:8080/api/assignee/';
  private taskDetailUrl = 'http://localhost:8080/api/tasks/';
  private addTaskUrl = 'http://localhost:8080/api/tasks/add';
  private changeTaskUrl = 'http://localhost:8080/api/tasks/';
  private priorityListUrl = 'http://localhost:8080/api/tasks/priorities';

  tasks: Task[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Accept': 'application/json',
    'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Tasks from the server */
  getTasksByProject(project: Project): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskListByProjectUrl + project.projectId + "/tasks");
  }  

  getTasksByReporter(userId: number): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskListByReporterUrl + userId + "/tasks");
  }  

  getTasksByAssignee(userId: number): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskListByAssigneeUrl + userId + "/tasks");
  }

  /** GET Tasks Detail from the server */
  getTaskDetail(id: number): Observable<Task> {
    return this.http.get<Task>(this.taskDetailUrl + id).pipe(
      map((task: Task) => {
        return task;
      }));
  }

  getPriorityList(): Observable<any> {
    return this.http.get<string[]>(this.priorityListUrl);
  }

  changeTaskAssignee(task: Task): Observable<any> {
    return this.http.post(this.changeTaskUrl + task.taskId + "/change/assignee", task.assignee);
  }

  changeTaskStatus(task: Task): Observable<any> {
    return this.http.post(this.changeTaskUrl + task.taskId + "/change/status", task.currentStatus);
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
