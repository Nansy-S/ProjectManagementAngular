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
      private router: Router,
      private loginService: LoginService) { }

  title = 'Project Management Application';
  
  showAdminBoard = false;
  showManagerBoard = false;

  isLoggedIn = false;
  userRole?:string;
  
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
     this.userRole = this.tokenStorageService.getUser().role;
    
      console.log(this.userRole);

     if (this.userRole === 'Administrator') {
       this.showAdminBoard = true;
       //this.router.navigate(['/admin']);
      }

      if (this.userRole === 'Project manager') {
        this.showManagerBoard = true;
        //this.router.navigate(['/projects']);
      }
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
