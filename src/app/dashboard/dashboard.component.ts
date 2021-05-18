import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService,
    private router: Router) { }

  title = 'Project Management Application';
  
  showAdminBoard = false;
  showManagerBoard = false;
  showDeveloperBoard = false;
  showTesterBoard = false;

  isLoggedIn = false;
  userRole?:string;
  userDetailLink = "";
  
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.userRole = this.tokenStorageService.getUser().role;
      this.userDetailLink = "/users/detail/" + this.tokenStorageService.getUser().id;
      if (this.userRole === 'Администратор') {
        this.showAdminBoard = true;
      }
      if (this.userRole === 'Project manager') {
        this.showManagerBoard = true;
      }
      if (this.userRole === 'Developer') {
        this.showDeveloperBoard = true;
      }
      if (this.userRole === 'Tester') {
        this.showTesterBoard = true;
      }
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}