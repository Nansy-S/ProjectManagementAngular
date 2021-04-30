import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './service/token-storage.service';
import { MatSliderModule } from '@angular/material/slider';

import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  role?: string;
  isLoggedIn = false;

  showAdminBoard = false;
  showManagerBoard = false;

  username?: string;

  title = 'Project Management Application';

  constructor(private LoginService: LoginService, 
    private tokenStorageService: TokenStorageService, 
    private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.role = user.roles;
      this.username = user.username;
      

      if (this.role === 'Administrator') {
        this.showAdminBoard = true;
        this.router.navigate(['/admin']);
      }

      if (this.role === 'Project manager') {
        this.showManagerBoard = true;
        this.router.navigate(['/manager']);
      }
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  getCurrentUserInfo() {

  }
}
