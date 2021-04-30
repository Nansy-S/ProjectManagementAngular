import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Task } from '../entity/task';
import { User } from '../entity/user';

import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {

  isAddedTask = false;

  assignee!: User;
  newTask: Task = {
    priority: '',
    estimationTime: 0,
    description: '',
    assigneeInfo: this.assignee
  };

  priorityList = [
    "Blocker",
    "Critical",
    "Major",
    "Normal",
    "Minor"
  ];

  constructor(private route: ActivatedRoute,
        private http: HttpClient,
        private taskService: TaskService) { }

  ngOnInit(): void {

  }

  add(): void {
    this.newTask.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.create(this.newTask)
      .subscribe(task => {
        this.isAddedTask = true;
      });
  }
}
