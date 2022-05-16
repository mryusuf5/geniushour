import { Component, OnInit } from '@angular/core';
import { ProjectService} from "../../services/project.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.scss']
})
export class SingleProjectComponent implements OnInit {

  public projectId: string;
  public singleProject: any;
  public teachers: any;

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((p) => {
      this.projectId = p["projectId"];
    })
    const data = {"projectId" : this.projectId };
    this.projectService.GetSingleProject(data).subscribe((e) => {
      this.singleProject = e;
    });

    this.projectService.GetTeachersForSingleProject(data).subscribe((e) =>{
      this.teachers = e;
    })
  }
}
