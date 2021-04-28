import { Component, OnInit } from '@angular/core';

import { LoginService } from '../service/login.service'

import { Account } from '../entity/account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  account!: Account;
  enteredEmail = "";
  enteredPassword = "";

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }

  getAccount(): void {
    this.loginService.login().subscribe(account => this.account = account);
  }


}
