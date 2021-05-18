import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { User } from '../entity/user';
import { Account } from '../entity/account';
import { AddUserComponent } from '../add-user/add-user.component';

import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users: User[] = [];
  accounts: Account[] = [];
  selectedUser!: Account;
  searchValue!: string;

  columnsToDisplay = ['full-name', 'email'];
  dataSource!: MatTableDataSource<Account>;

  constructor(public dialog: MatDialog, 
      private AccountService: AccountService,
      private route: Router) { }

  ngOnInit(): void {
    this.getUsers(); 

  }

  getUsers(): void {
    this.AccountService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
      this.dataSource = new MatTableDataSource(this.accounts);
    });
  }

  goToUserDetail(account: Account) {
    let userDetailLink = "/users/detail/" + account.accountId;
    this.route.navigate([userDetailLink]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNewUser() {
    this.dialog.open(AddUserComponent, {
      panelClass: 'custom-dialog-add-project'
    });
  }
}
