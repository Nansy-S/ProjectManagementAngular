import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../entity/user';
import { Task } from '../entity/task';

import { TokenStorageService } from '../service/token-storage.service'
import { TaskService } from '../service/task.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user!: User;
  userId = 0;
  currentUserRole = "";
  taskList: Task[] = [];
  isProfile = true;
  isManager = false;

  constructor(private route: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.currentUserRole = this.tokenStorage.getUser().role;
    this.getUserDetail();
    console.log(this.user);
    if(this.currentUserRole == "Project manager" || this.currentUserRole == "Administrator") {
      this.isProfile = false;
      this.isManager = true;
      this.getTasksByAssignee();
    }
  }

  getUserDetail(): void {
    this.userService.getUserDetail(this.userId).subscribe(data => this.user = data);
  }

  getTasksByAssignee(): void {
    this.taskService.getTasksByAssignee(this.userId).subscribe(tasks => this.taskList = tasks);
  }

  goToTaskDetail(task: Task) {

  }
}
