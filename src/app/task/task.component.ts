import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Project } from '../entity/project';
import { Task } from '../entity/task';

import { TokenStorageService } from '../service/token-storage.service'
import { TaskService } from '../service/task.service';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
  })


export class TaskComponent implements OnInit {

    @Input() project!: Project;

    currentUserId = 0;
 
    tasks: Task[] = [];
    task!: Task;
    selectedTask!: Task;
  
    constructor(private route: Router,
        private tokenStorage: TokenStorageService,
        private http: HttpClient,
        private taskService: TaskService) { }
  
    ngOnInit(): void {
      console.log(this.project);
      if(this.project == undefined) {
        this.currentUserId = this.tokenStorage.getUser().id;
        if(this.tokenStorage.getUser().role == "Project manager") {
          this.getTasksByReporter();
        }
        if(this.tokenStorage.getUser().role == "Developer" || 
            this.tokenStorage.getUser().role == "Tester") {
          this.getTasksByAssignee();
        }
      } else { 
        this.getTasksByProject();
      }
    }
  
    getTasksByProject(): void {
      this.taskService.getTasksByProject(this.project).subscribe(tasks => this.tasks = tasks);
    }

    getTasksByReporter(): void {
      this.taskService.getTasksByReporter(this.currentUserId).subscribe(tasks => this.tasks = tasks);
    }

    getTasksByAssignee(): void {
      this.taskService.getTasksByAssignee(this.currentUserId).subscribe(tasks => this.tasks = tasks);
    }

    goToTaskDetail(task: Task) {
      this.route.navigate(['tasks/detail/' + task.taskId]);
    }

    addNewTask() {
      this.route.navigate(['projects/' + this.project.projectId + '/tasks/add']);
    } 
  }