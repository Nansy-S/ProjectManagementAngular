import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { MessagesComponent } from './messages/messages.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardManagerComponent } from './board-manager/board-manager.component';

import { LoginInterceptor } from './helpers/login.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    ProjectComponent,
    TaskComponent,
    MessagesComponent,
    BoardAdminComponent,
    BoardManagerComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: LoginInterceptor,
    multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
