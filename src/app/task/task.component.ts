import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';

import { Project } from '../entity/project';
import { Task } from '../entity/task';
import { Account } from '../entity/account';
import { User } from '../entity/user';

import { TaskService } from '../service/task.service';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
  })


export class TaskComponent implements OnInit {

    @Input() project!: Project;

    assignee!: User;
    tasks: Task[] = [];
    task!: Task;
    selectedTask!: Task;
    newTask: Task = {
      priority: '',
      estimationTime: 0,
      description: '',
      assigneeInfo: this.assignee
    };

    addForm = false;
    isAddedTask = false;

    priorityList = [
      "Blocker",
      "Critical",
      "Major",
      "Normal",
      "Minor"
    ];
    taskPriority = this.priorityList[1];
  
    constructor(private http: HttpClient,
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
      this.addForm = true;
    }

    onChangePriority(priority: string) {
      this.newTask.priority = priority;
    }

    add(): void {
      this.newTask.projectId = this.project.projectId;
      this.taskService.create(this.newTask)
        .subscribe(task => {
          this.tasks.push(task);
          this.isAddedTask = true;
        });
    }
  }