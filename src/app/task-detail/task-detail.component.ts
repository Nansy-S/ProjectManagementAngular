import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Task } from '../entity/task';
import { Account } from '../entity/account';

import { TaskService } from '../service/task.service';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  task!: Task;
  newAssignee = 0;

  assigneeRole = "";
  isAppointAssignee = false;

  assigneeList: Account[] = [];

  constructor(private route: ActivatedRoute,
    private taskService: TaskService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.getTaskDetail();
  }

  getTaskDetail(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskDetail(id)
      .subscribe(task => this.task = task);
  }

  appointAssignee() {
    this.isAppointAssignee = true;
    this.assigneeRole = "Developer";
    this.getUsersByRole();
  }

  saveAssidnee() {
    console.log(this.newAssignee);
    this.task.assignee = this.newAssignee;
    this.taskService.changeTaskAssignee(this.task)
      .subscribe(task => this.task = task);
  }

  getUsersByRole() {
    this.accountService.getUsersByRole(this.assigneeRole)
      .subscribe(assigneeList => this.assigneeList = assigneeList);
  }
}
