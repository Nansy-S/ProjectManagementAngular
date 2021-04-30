import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    project: Project = {
      projectCode: '',
      summary: '',
    };
    selectedProject!: Project;
    
    addForm = false;

    isAddedProject = false;
    isGoToProjectDetail = false;
  
    constructor(private http: HttpClient,
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
      this.addForm = true;
    }

    add(): void {
      const newProject = {
        projectId: 0,
        projectCode: this.project.projectCode,
        summary: this.project.summary,
        dueDate: this.project.dueDate,
      };
      this.ProjectService.create(newProject)
        .subscribe(project => {
          this.projects.push(project);
          this.isAddedProject = true;
        });
    }

  }