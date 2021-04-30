import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';

import { Project } from '../entity/project';
import { Task } from '../entity/task';

import { TaskService } from '../service/task.service';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
  })


export class TaskComponent implements OnInit {

    @Input() project!: Project;
 
    tasks: Task[] = [];
    task!: Task;
    selectedTask!: Task;
  
    constructor(private route: Router,
        private http: HttpClient,
        private taskService: TaskService) { }
  
    ngOnInit(): void {
      this.getTasks();
      console.log(this.tasks);
  
    }
  
    getTasks(): void {
      this.taskService.getTasks(this.project).subscribe(tasks => this.tasks = tasks);
    }

    onSelect(selectedTask: Task){

    }

    addNewTask() {
      this.route.navigate(['projects/' + this.project.projectId + '/tasks/add']);
    } 
  }