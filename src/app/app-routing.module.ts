import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [ 
  { path: 'login', component: LoginComponent },

  { path: '', component: DashboardComponent },

  { path: 'projects', component: ProjectComponent },
  { path: 'projects/detail/:id', component: ProjectDetailComponent },

  { path: 'tasks', component: TaskComponent },
  { path: 'projects/:id/tasks/add', component: AddTaskComponent },
  { path: 'tasks/detail/:id', component: TaskDetailComponent },

  { path: 'users', component: UsersComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
