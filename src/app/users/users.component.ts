import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../entity/user';
import { Account } from '../entity/account';

import { UserService } from '../service/user.service';
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

  constructor(private http: HttpClient,
      private UserService: UserService,
      private AccountService: AccountService) { }

  ngOnInit(): void {
    this.getUsers();

  }

  getUsers(): void {
    this.AccountService.getAccounts().subscribe(accounts => this.accounts = accounts);
  }

  onSelect(account: Account) {
    this.selectedUser = account;
  }

}
