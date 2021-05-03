import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';

import { Task } from '../entity/task';
import { Project } from '../entity/project';
import { User } from '../entity/user';

import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { TaskService } from '../service/task.service';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: AddTaskComponent }   
  ]
})

export class AddTaskComponent implements OnInit {

  isAddedTask = false;

  assignee!: User;
  newTask: Task = {
    taskCode: '',
    priority: '',
    dueDate: new Date(),
    estimationTime: 0,
    currentStatus: '',
    description: '',
    assigneeInfo: this.assignee
  };

  priorityList: string[] = [
    
  ];

  projectList: Project[] = [];

  constructor( private route: ActivatedRoute,
        private http: HttpClient,
        private taskService: TaskService,
        private ProjectService: ProjectService,
        public dialog: MatDialog,
      
        public dialogRef: MatDialogRef<AddTaskComponent>,
        @Inject(MAT_DIALOG_DATA) public project: Project) { }

  ngOnInit(): void {
      this.getPriorityList();
      if(this.project === undefined) {
        this.ProjectService.getProjects().subscribe(projectList => this.projectList = projectList);
      }
  }

  onAddClick(): void {
    if(this.project != undefined) {
      this.newTask.projectId = this.project.projectId;
    }
    this.taskService.create(this.newTask)
      .subscribe(task => {
        this.isAddedTask = true;
        this.displaySuccessDialog("Task added successfully!");
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
    window.location.reload();
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

  getPriorityList() {
    this.taskService.getPriorityList().subscribe(priorityList => this.priorityList = priorityList);
  }
}
