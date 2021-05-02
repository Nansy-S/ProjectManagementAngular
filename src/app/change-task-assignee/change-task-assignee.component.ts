import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';

import { DialogChangeTaskAssigneeData, Responce } from '../entity/dialog-data';

@Component({
  selector: 'app-change-task-assignee',
  templateUrl: './change-task-assignee.component.html',
  styleUrls: ['./change-task-assignee.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: ChangeTaskAssigneeComponent }   
  ]
})

export class ChangeTaskAssigneeComponent {

  responce = <Responce>{
    newAssigneeId: 0,
    isChange: true
  }

    constructor(
      public dialogRef: MatDialogRef<ChangeTaskAssigneeComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogChangeTaskAssigneeData,
      ) {}
  
    onNoClick(): void {
      this.responce.isChange = false;
      this.dialogRef.close();
    }
  }

