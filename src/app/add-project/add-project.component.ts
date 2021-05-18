import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';

import { Project } from '../entity/project';

import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: AddProjectComponent }   
  ]
})
export class AddProjectComponent implements OnInit {
  
  newProject: Project = {
    projectCode: '',
    summary: '',
    dueDate: new Date()
  };

  constructor(private route: ActivatedRoute,
    private ProjectService: ProjectService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddProjectComponent>
  ) { }

  ngOnInit(): void {

  }

  onAddClick(): void {
    this.ProjectService.create(this.newProject)
        .subscribe(project => {
          if(project) {
            this.displaySuccessDialog("Project added successfully!");
          }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
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
