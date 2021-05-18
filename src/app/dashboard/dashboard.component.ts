import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService) { }

  title = 'Project Management App';
  
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
      if (this.userRole === 'Менеджер проекта') {
        this.showManagerBoard = true;
      }
      if (this.userRole === 'Разработчик') {
        this.showDeveloperBoard = true;
      }
      if (this.userRole === 'Тестировщик') {
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