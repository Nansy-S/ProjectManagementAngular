import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../service/login.service'
import { TokenStorageService } from '../service/token-storage.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role = '';

  constructor(private loginService: LoginService,
     private tokenStorage: TokenStorageService,
     private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;

      if (this.role === 'Администратор') {
        this.router.navigate(['/users']);
      }
    
      if (this.role === 'Project manager') {
        this.router.navigate(['/projects']);
      }
      if (this.role === 'Developer' ||
            this.role === 'Tester') {
        this.router.navigate(['/tasks']);
      }
    }
  }

  onSubmit(): void {
    this.loginService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.tokenStorage.getUser().role;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
