import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Project } from '../entity/project';

import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})

export class ProjectDetailComponent implements OnInit {

  project!: Project;

  isViewTask = false;

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjectDetail();
  }

  getProjectDetail(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProjectDetail(id)
      .subscribe(project => this.project = project);
  }

  displayTasks(){
    if (!this.isViewTask) {
      this.isViewTask = true;
    } else {
      this.isViewTask = false;
    }
  }
}
