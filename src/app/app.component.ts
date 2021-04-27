import { Component } from '@angular/core';
import { Account } from './entity/account'

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Project Management Application';

  currentUser!: Account;
  currentUserRole!: string;

  constructor(private LoginService: LoginService) {}

  setCurrentUser() {
    this.LoginService.login().subscribe(currentUser => this.currentUser = currentUser);
    console.log(this.currentUser);
  }
}
