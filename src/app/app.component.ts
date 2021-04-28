import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './service/token-storage.service';

import { Account } from './entity/account'
import { Action } from './entity/action'

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;

  showAdminBoard = false;
  showManagerBoard = false;

  username?: string;

  title = 'Project Management Application';

  currentUser!: Account;
  currentUserRole!: string;

  constructor(private LoginService: LoginService, private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showManagerBoard = this.roles.includes('ROLE_MANAGER');

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  setCurrentUser() {
   // this.LoginService.login().subscribe(currentUser => this.currentUser = currentUser);
   // console.log(this.currentUser);
  }
}
