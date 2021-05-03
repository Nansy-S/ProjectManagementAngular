import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './service/token-storage.service';

import { LoginService } from './service/login.service';
import { User } from './entity/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  role?: string;
  username?: string;

  isLoggedIn = false;

  constructor(private LoginService: LoginService, 
    private tokenStorageService: TokenStorageService, 
    private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.role = this.tokenStorageService.getUser().roles;
      if (this.role === 'Administrator') {
        this.router.navigate(['/users']);
      }
      if (this.role === 'Project manager') {
        this.router.navigate(['/projects']);
      }
      if (this.role === 'Developer' || this.role === 'Tester') {
        this.router.navigate(['/tasks']);
      }
    } else {
      this.router.navigate(['login']);
    }
  }
}
