import { Component, OnInit } from '@angular/core';
import { ProjectService} from "../../services/project.service";
import { ActivatedRoute, Router } from "@angular/router";
import {FormGroup, FormBuilder} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-single-project-edit',
  templateUrl: './single-project-edit.component.html',
  styleUrls: ['./single-project-edit.component.scss']
})
export class SingleProjectEditComponent implements OnInit {

  public projectId: string;
  public singleProject: any;
  public teachers: any;
  public fields: any;
  public editForm: FormGroup;
  public formProjectName: any;
  public formProjectField: any;
  public formProjectDuration: any;
  public formProjectDifficulity: any;
  public formProjectTeacher: any;
  public formProjectDescription: any;
  public messages: any;

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router,
              private form: FormBuilder) { }

  ngOnInit(): void {
    this.projectService.GetAllFields().subscribe((e) => {
      this.fields = e;
    })
    this.route.queryParams.subscribe((p) => {
      this.projectId = p["projectId"];
    })
    const data = {"projectId" : this.projectId };
    this.projectService.GetSingleProject(data).subscribe((e) => {
      this.singleProject = e;
      this.formProjectName = this.singleProject[0].project_name;
      this.formProjectField = this.singleProject[0].field_id;
      this.formProjectDescription = this.singleProject[0].project_description;
      this.formProjectDuration = this.singleProject[0].project_duration;
      this.formProjectDifficulity = this.singleProject[0].project_difficulty;
    });

    this.projectService.GetTeachersForSingleProject(data).subscribe((e) =>{
      this.teachers = e;
    })
  }

  public editProject(e)
  {
    const data = [
      e.srcElement.id,
      this.formProjectDuration,
      this.formProjectDifficulity,
      this.formProjectName,
      this.formProjectDescription,
      this.formProjectField
    ];
    this.projectService.EditProject(data).subscribe((e) => {
      this.messages = e;
    })
  }

  deleteProject(e)
  {
    console.log(e.srcElement.id);
    Swal.fire({
      title: "Weet je het zeker?",
      text: "Het project word voor altijd verwijderd.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#BB2D3B",
      cancelButtonColor: "#169898",
      confirmButtonText: "Ja",
      cancelButtonText: "Nee"
    }).then((result) => {
      if(result.isConfirmed)
      {
        const data = e.srcElement.id;
        this.projectService.deleteProject(data).subscribe(() => {

        })
        Swal.fire(
          "Verwijderd",
          "Het project is succesvol verwijderd",
          "success"
        )
        setTimeout(() => {
          this.router.navigate(["/projecten"]);
        }, 1000)
      }
    })
  }
}
