import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { Project } from '../entity/project';
import { Task } from '../entity/task';
import { AddTaskComponent } from '../add-task/add-task.component';

import { TokenStorageService } from '../service/token-storage.service'
import { TaskService } from '../service/task.service';


@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {

    @Input() project!: Project;

    currentUserId = 0;
 
    tasks: Task[] = [];
    task!: Task;
    selectedTask!: Task;

    isBtnAdd = false;

    searchValue!: string;

    columnsToDisplay = ['code', 'priority', 'dueDate', 'estimationTime', 'currentStatus', 'assignee'];
    dataSource!: MatTableDataSource<Task>;

    constructor(public dialog: MatDialog, 
        private route: Router,
        private tokenStorage: TokenStorageService,
        private http: HttpClient,
        private taskService: TaskService) { }
  
    ngOnInit(): void {
      if(this.project == undefined) {
        this.currentUserId = this.tokenStorage.getUser().id;
        if(this.tokenStorage.getUser().role == "Project manager") {
          this.isBtnAdd = true;
          this.getTasksByReporter();
        }
        if(this.tokenStorage.getUser().role == "Developer" || 
            this.tokenStorage.getUser().role == "Tester") {
          this.getTasksByAssignee();
        }
      } else { 
        this.isBtnAdd = true;
        this.getTasksByProject();
      }
    }
   
    getTasksByProject(): void {
      this.taskService.getTasksByProject(this.project).subscribe(tasks => {
        this.tasks = tasks;
        this.dataSource = new MatTableDataSource(this.tasks);
      });
    }

    getTasksByReporter(): void {
      this.taskService.getTasksByReporter(this.currentUserId).subscribe(tasks => {
        this.tasks = tasks;
        this.dataSource = new MatTableDataSource(this.tasks);
      });
    }

    getTasksByAssignee(): void {
      this.taskService.getTasksByAssignee(this.currentUserId).subscribe(tasks => {
        this.tasks = tasks;
        this.dataSource = new MatTableDataSource(this.tasks);
      });
    }

    goToTaskDetail(task: Task) {
      this.route.navigate(['tasks/detail/' + task.taskId]);
    }

    addNewTask() {
      this.dialog.open(AddTaskComponent, {
        panelClass: 'custom-dialog-add-task',
        data: this.project
      });
    } 
    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
