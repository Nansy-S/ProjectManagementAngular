import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Task } from '../entity/task';
import { User } from '../entity/user';
import { DialogChangeTaskAssigneeData, DialogDataMsg, Responce } from '../entity/dialog-data';

import { ChangeTaskAssigneeComponent } from '../change-task-assignee/change-task-assignee.component';
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

import { TokenStorageService } from '../service/token-storage.service'
import { TaskService } from '../service/task.service';
import { UserService } from '../service/user.service';

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

  assigneeList: User[] = [];
  responce = <Responce>{
    newAssigneeId: 0,
    isChange: true
  }

  constructor(private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private taskService: TaskService,
    private userService: UserService,
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
    if(task.currentStatus == "Открыта" || task.currentStatus == "Переоткрыта") {
      this.assigneeRole = "Разработчик";
    }
    if(task.currentStatus == "Реализована") {
      this.assigneeRole = "Tester";
      isWarnDialog = true;
      this.warnMsg = "Задача выполнена, но не готова к тестированию. Продолжить смену исполнителя?";
    }
    if(task.currentStatus == "В процессе") {
      this.assigneeRole = "Разработчик";
      isWarnDialog = true;
      this.warnMsg = "Задача в работе. Вы уверены, что хотите сменить исполнителя?";
    }
    if(task.currentStatus == "Готова к тестированию") {
      this.assigneeRole = "Тестировщик";
    }
    if(task.currentStatus == "Тестируется") {
      this.assigneeRole = "Тестировщик";
      isWarnDialog = true;
      this.warnMsg = "Задача в работе. Вы уверены, что хотите сменить исполнителя?";
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
          if(task.currentStatus == "Реализована") {
            task.currentStatus = "Готова к тестированию";
            this.taskService.changeTaskStatus(task);
          }
        }
      });
    }
  }

  changeAssignee() {
    this.userService.getUsersByRole(this.assigneeRole)
        .subscribe(assigneeList => {
          this.assigneeList = assigneeList;

          const dialogRef = this.dialog.open(ChangeTaskAssigneeComponent, {
            panelClass: 'custom-dialog-change-assignee',
            data: {newAssigneeId: 0, role: this.assigneeRole, assigneeList: this.assigneeList}
          });

          dialogRef.afterClosed().subscribe(result => {
            this.responce = result;
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
    this.displaySuccessDialog("Исполнитель успешно изменен!");
  }

  getUsersByRole() {
    this.userService.getUsersByRole(this.assigneeRole)
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