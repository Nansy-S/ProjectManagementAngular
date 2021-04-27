import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Project } from '../entity/project';
import { Task } from '../entity/task';

import { ProjectService } from '../service/project.service';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
  })

export class TaskComponent implements OnInit {

    projects: Project[] = [];
  
    constructor(private http: HttpClient,
        private ProjectService: ProjectService) { }
  
    ngOnInit(): void {
      this.getUsers();
  
    }
  
    getUsers(): void {
     
    }
  
  }