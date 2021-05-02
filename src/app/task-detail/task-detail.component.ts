import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Task } from '../entity/task';
import { Account } from '../entity/account';
import { DialogChangeTaskAssigneeData, DialogDataMsg, Responce } from '../entity/dialog-data';

import { ChangeTaskAssigneeComponent } from '../change-task-assignee/change-task-assignee.component';
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

import { TokenStorageService } from '../service/token-storage.service'
import { TaskService } from '../service/task.service';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})

export class TaskDetailComponent implements OnInit {

  task!: Task;
  currentTaskStatus = "";
  newAssigneeId = 0;

  currentUserId = 0;
  currentUserRole = "";
  assigneeRole = "";
  warnMsg = "";

  isAssigneTaskButton = false;
  isAssigneTask = false;

  dataFromDialog!: DialogChangeTaskAssigneeData;
  warningDialogData!: DialogDataMsg;

  assigneeList: Account[] = [];
  responce = <Responce>{
    newAssigneeId: 0,
    isChange: true
  }

  constructor(private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private taskService: TaskService,
    private accountService: AccountService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentUserId = this.tokenStorage.getUser().id;
    this.currentUserRole = this.tokenStorage.getUser().role;
    this.getTaskDetail();
  }

  getTaskDetail(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskDetail(id)
      .subscribe((data:Task) => {
        this.task = data;
    });
  }

  assigneTask(task: Task) {
    let isWarnDialog = false;
    if(task.currentStatus == "Open" || task.currentStatus == "Reopened") {
      this.assigneeRole = "Developer";
    }
    if(task.currentStatus == "Resolved") {
      this.assigneeRole = "Tester";
      isWarnDialog = true;
      this.warnMsg = "Task was resolved but not ready for test. Continue change assignee?";
    }
    if(task.currentStatus == "In progress") {
      this.assigneeRole = "Developer";
      isWarnDialog = true;
      this.warnMsg = "Task in progress. Are you sure you want to change assignee?";
    }
    if(task.currentStatus == "Ready for Test") {
      this.assigneeRole = "Tester";
    }
    if(task.currentStatus == "Tested") {
      this.assigneeRole = "Tester";
      isWarnDialog = true;
      this.warnMsg = "Task in progress. Are you sure you want to change assignee?";
    }
    
    if(!isWarnDialog) {
      this.changeAssignee();
    } else {
      const dialogRefWarn = this.dialog.open(WarningDialogComponent, {
        panelClass: 'custom-dialog',
        data: { context: this.warnMsg }
      });

      dialogRefWarn.afterClosed().subscribe(result => {
        if(result) {
          this.changeAssignee();
        }
      });
    }
  }

  changeAssignee() {
    this.accountService.getUsersByRole(this.assigneeRole)
        .subscribe(assigneeList => {
          this.assigneeList = assigneeList;

          const dialogRef = this.dialog.open(ChangeTaskAssigneeComponent, {
            panelClass: 'custom-dialog',
            data: {newAssigneeId: 0, assigneeList: this.assigneeList}
          });

          dialogRef.afterClosed().subscribe(result => {
            this.responce = result;
            console.log(this.responce.isChange);
            if(this.responce.isChange) {
            this.newAssigneeId = this.responce.newAssigneeId;
              this.saveAssignee();
            }
          });
      }); 
  }
  
  saveAssignee() {
    this.task.assignee = this.newAssigneeId;
    this.taskService.changeTaskAssignee(this.task)
      .subscribe(task => {
        this.task = task;
      });
    this.displaySuccessDialog("Assignee changed successfully!");
  }

  getUsersByRole() {
    this.accountService.getUsersByRole(this.assigneeRole)
      .subscribe(assigneeList => this.assigneeList = assigneeList);
  }

  displaySuccessDialog(msg: string) {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      panelClass: 'custom-dialog',
      data: { context: msg }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        window.location.reload();
      }
    });
  }
}