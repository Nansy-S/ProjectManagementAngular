import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../service/login.service'
import { TokenStorageService } from '../service/token-storage.service'

import { Account } from '../entity/account';
import { CompileShallowModuleMetadata } from '@angular/compiler';

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

      if (this.role === 'Administrator') {
        this.router.navigate(['/admin']);
      }
    
      if (this.role === 'Project manager') {
        this.router.navigate(['/manager']);
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
