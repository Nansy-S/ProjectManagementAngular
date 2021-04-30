import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

import { TaskComponent } from './task/task.component';
import { LoginComponent } from './login/login.component';


import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardManagerComponent } from './board-manager/board-manager.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'projects', component: ProjectComponent },
  { path: 'projects/detail/:id', component: ProjectDetailComponent },

  { path: 'users', component: UsersComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'manager', component: BoardManagerComponent },
  { path: 'tasks', component: TaskComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
