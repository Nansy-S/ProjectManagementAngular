import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Task } from '../entity/task';

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
    if(this.currentUserRole == "Разработчик" &&
        (this.task.currentStatus == "Открыта" || this.task.currentStatus == "Переоткрыта")) {
      this.isStartTask = true;
    }
    if(this.currentUserRole == "Разработчик" && this.task.currentStatus == "В процессе") {
      this.isResolvedTask = true;
    }
    if(this.currentUserRole == "Разработчик" && this.task.currentStatus == "Реализована") {
      this.isSendOnTest = true;
    }
    if(this.currentUserRole == "Тестировщик" && this.task.currentStatus == "Готова к тестированию") {
      this.isStartTest = true;
    }
    if(this.currentUserRole == "Тестировщик" && this.task.currentStatus == "Тестируется") {
      this.isReopenTask = true;
      this.isCloseTask = true;
    }
    if(this.currentUserRole == "Менеджер проекта") {
      if(this.task.currentStatus != "Закрыта") {
        this.isCloseTask = true;
      }
    }
  }

  startTask() {
    this.newTaskStatus = "В процессе";
    this.saveTaskStatus();
  }

  resolvedTask() {
    this.newTaskStatus = "Реализована";
    this.saveTaskStatus();
  }

  sendOnTest() {
    this.newTaskStatus = "Готова к тестированию";
    this.saveTaskStatus();
  }

  startTest() {
    this.newTaskStatus = "Тестируется";
    this.saveTaskStatus();
  }

  reopenTask() {
    this.newTaskStatus = "Переоткрыта";
    this.saveTaskStatus();
  }

  closeTask() {
    this.newTaskStatus = "Закрыта";
    let msg = "Вы уверены, что хотите закрыть задачу?";
    if(this.task.currentStatus != "Открыта") {
      msg = "Задача в работе. " + msg;
    } 
    if(this.currentUserRole == "Менеджер проекта" || this.currentUserRole == "Тестировщик") {
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
    this.displaySuccessDialog("Статус задачи успешно изменен!");
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
