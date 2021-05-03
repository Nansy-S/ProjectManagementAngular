

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { MessagesComponent } from './messages/messages.component';

import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginInterceptor } from './helpers/login.interceptor';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { ChangeTaskAssigneeComponent } from './change-task-assignee/change-task-assignee.component';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { ChangeTaskStatusComponent } from './change-task-status/change-task-status.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    ProjectComponent,
    TaskComponent,
    MessagesComponent,
    ProjectDetailComponent,
    DashboardComponent,
    AddTaskComponent,
    TaskDetailComponent,
    ChangeTaskAssigneeComponent,
    WarningDialogComponent,
    SuccessDialogComponent,
    ChangeTaskStatusComponent,
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatNativeDateModule,
    MatTableModule,
  ],
  exports: [
    MatInputModule,
    FormsModule
  ],
  entryComponents: [
    MatDialogModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: LoginInterceptor,
    multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
