import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Project } from '../entity/project';
import { AddProjectComponent } from '../add-project/add-project.component';

import { ProjectService } from '../service/project.service';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
  })

export class ProjectComponent implements OnInit {

    projects: Project[] = [];
    project: Project = {
      projectCode: '',
      summary: '',
      dueDate: new Date
    };
    selectedProject!: Project;

    isGoToProjectDetail = false;
  
    constructor(public dialog: MatDialog, 
        private http: HttpClient,
        private ProjectService: ProjectService,
        private router: Router) { }
  
    ngOnInit(): void {
      this.getProjects();
    }
  
    getProjects(): void {
     this.ProjectService.getProjects().subscribe(projects => this.projects = projects);
    }
  
    goToProjectDetail(project: Project) {
      this.isGoToProjectDetail = true;
      this.router.navigate(['projects/detail/' + project.projectId]);
    }

    addNewProject() {
      this.dialog.open(AddProjectComponent, {
        panelClass: 'custom-dialog-add-project'
      });
    }
  }