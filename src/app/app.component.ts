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

      console.log(this.isLoggedIn);

    if (this.isLoggedIn) {

      //const user = this.tokenStorageService.getUser();
      //this.role = user.roles;
      
      this.router.navigate(['/']);

    } else {
      this.router.navigate(['login']);
    }
  }
}
