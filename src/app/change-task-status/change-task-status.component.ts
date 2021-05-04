import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Task } from '../entity/task';
import { DialogChangeTaskAssigneeData, DialogDataMsg, Responce } from '../entity/dialog-data';

import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

import { TokenStorageService } from '../service/token-storage.service'
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-change-task-status',
  templateUrl: './change-task-status.component.html',
  styleUrls: ['./change-task-status.component.css']
})

export class ChangeTaskStatusComponent implements OnInit {

  @Input() task!: Task;

  currentUserId = 0;
  currentUserRole = "";

  newTaskStatus = "";

  isStartTask = false;
  isResolvedTask = false;
  isSendOnTest = false;
  isReopenTask = false;
  isCloseTask = false;
  isStartTest =  false;

  constructor(private tokenStorage: TokenStorageService,
    private taskService: TaskService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentUserId = this.tokenStorage.getUser().id;
    this.currentUserRole = this.tokenStorage.getUser().role;
    this.displayButtonChangeStatus();
  }

  displayButtonChangeStatus() {
    if(this.currentUserRole == "Developer" &&
        (this.task.currentStatus == "Open" || this.task.currentStatus == "Reopened")) {
      this.isStartTask = true;
    }
    if(this.currentUserRole == "Developer" && this.task.currentStatus == "In progress") {
      this.isResolvedTask = true;
    }
    if(this.currentUserRole == "Developer" && this.task.currentStatus == "Resolved") {
      this.isSendOnTest = true;
    }
    if(this.currentUserRole == "Tester" && this.task.currentStatus == "Ready for Test") {
      this.isStartTest = true;
    }
    if(this.currentUserRole == "Tester" && this.task.currentStatus == "Tested") {
      this.isReopenTask = true;
      this.isCloseTask = true;
    }
    if(this.currentUserRole == "Project manager") {
      if(this.task.currentStatus != "Closed") {
        this.isCloseTask = true;
      }
    }
  }

  startTask() {
    this.newTaskStatus = "In progress";
    this.saveTaskStatus();
  }

  resolvedTask() {
    this.newTaskStatus = "Resolved";
    this.saveTaskStatus();
  }

  sendOnTest() {
    this.newTaskStatus = "Ready for Test";
    this.saveTaskStatus();
  }

  startTest() {
    this.newTaskStatus = "Tested";
    this.saveTaskStatus();
  }

  reopenTask() {
    this.newTaskStatus = "Reopened";
    this.saveTaskStatus();
  }

  closeTask() {
    this.newTaskStatus = "Closed";
    let msg = "Are you sure you close task?";
    if(this.task.currentStatus != "Open") {
      msg = "Task in progress. " + msg;
    } 
    if(this.currentUserRole == "Project manager" || this.currentUserRole == "Tester") {
      const dialogRefWarn = this.dialog.open(WarningDialogComponent, {
        panelClass: 'custom-dialog',
        data: { context: msg }
      });

      dialogRefWarn.afterClosed().subscribe(result => {
        if(result) {
          this.saveTaskStatus();
        }
      });
    } else {
      this.saveTaskStatus();
    }
  }

  saveTaskStatus() {
    this.task.currentStatus = this.newTaskStatus;
    console.log( this.newTaskStatus);
    this.taskService.changeTaskStatus(this.task)
      .subscribe(task => {
        this.task = task;
        console.log(this.task);
      });
    this.displaySuccessDialog("Task status changed successfully!");
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
