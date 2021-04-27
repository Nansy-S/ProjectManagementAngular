import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Project } from '../entity/project';

import { ProjectService } from '../service/project.service';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
  })

export class ProjectComponent implements OnInit {

    projects: Project[] = [];
  
    constructor(private http: HttpClient,
        private ProjectService: ProjectService) { }
  
    ngOnInit(): void {
      this.getUsers();
  
    }
  
    getUsers(): void {
     
    }
  
  }