import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';

import { User } from '../entity/user';
import { Account } from '../entity/account';

import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: AddUserComponent }   
  ]
})
export class AddUserComponent implements OnInit {

  newAccount: Account = {
    name: '',
    surname: '',
    patronymic: '',
    email: '',
    password: '',
    role: ''
  }

  newUser: User = {
    position: '',
    phone: '',
    accountInfo: this.newAccount
  };

  roleList: string[] = [
    'Tester'
  ]

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddUserComponent>) { }

  ngOnInit(): void {
  }

  onAddClick(): void {
    this.userService.create(this.newUser)
        .subscribe(user => {
          if(user) {
            this.displaySuccessDialog("User added successfully!");
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
