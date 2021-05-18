import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { LoginService } from '../service/login.service'
import { TokenStorageService } from '../service/token-storage.service'

import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

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
     private router: Router,
     public dialog: MatDialog,) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;

      if (this.role === 'Администратор') {
        this.router.navigate(['/users']);
      }
    
      if (this.role === 'Менеджер проекта') {
        this.router.navigate(['/projects']);
      }
      if (this.role === 'Разработчик' || this.role === 'Тестировщик') {
        this.router.navigate(['/tasks']);
      }
    }
  }

  onSubmit(): void {
    this.loginService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        //this.isLoginFailed = false;
        //this.isLoggedIn = true;
        this.role = this.tokenStorage.getUser().role;
        this.displayMessageDialog("Вход успешно выполнен! Вы вошли как" + this.role, );
        //this.reloadPage();
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

  displayMessageDialog(msg: string, type: string) {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      panelClass: 'custom-dialog',
      data: { context: msg }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        window.location.reload();
      }
    });
  }
}
