import { Component, OnInit } from '@angular/core';
import { ProjectService} from "../../services/project.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
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
  public formProjectDescription: any;
  public messages: any;
  public projectSupplies: any = [];
  public selectedFiles: any = [];
  public projectForm: FormGroup;

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService) { }

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
    this.getSupplies();

    this.projectForm = this.formBuilder.group({
      projectId: [""],
      files: [null]
    })
  }

  public uploadFile(e)
  {
    this.selectedFiles = e.target.files;
    this.projectForm.patchValue({
      files: this.selectedFiles
    })
  }

  public uploadFiles()
  {
    const files = new FormData();

    for(let i = 0; i < this.selectedFiles.length; i++)
    {
      files.append("files[]", this.selectedFiles[i]);
    }
    files.append("projectId", this.projectId);
    this.spinner.show();
    this.projectService.addProjectSupply(files).subscribe((e) => {
      this.getSupplies();
      this.spinner.hide();
    })
  }

  public deleteSupply(e)
  {
    Swal.fire({
      title: "Weet u zeker dat u dit document wilt verwijderen?",
      text: " ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#169898",
      cancelButtonColor: "#BB2D3B",
      confirmButtonText: "Ja",
      cancelButtonText: "Nee"
    }).then((result) => {
      if(result.isConfirmed)
      {
        this.projectService.deleteSupply(e.target.id).subscribe((e) => {
          Swal.fire(
            "Het project is succesvol aangepast",
            " ",
            "success"
          )
          this.getSupplies();
        })
      }
    })

  }

  public getSupplies()
  {
    this.projectService.getProjectSupplies(this.projectId).subscribe((e) => {
      this.projectSupplies = e;
      console.log(this.projectSupplies);
    })
  }

  public editProject(e)
  {
    const data = [
      e.target.id,
      this.formProjectDuration,
      this.formProjectDifficulity,
      this.formProjectName,
      this.formProjectDescription,
      this.formProjectField
    ];
    Swal.fire({
      title: "Weet u zeker dat u dit project wilt aanpassen?",
      text: " ",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#169898",
      cancelButtonColor: "#BB2D3B",
      confirmButtonText: "Ja",
      cancelButtonText: "Nee"
    }).then((result) => {
      if(result.isConfirmed)
      {
        const data = e.srcElement.id;
        this.projectService.EditProject(data).subscribe(() => {
        })
        Swal.fire(
          "Het project is succesvol aangepast",
          " ",
          "success"
        )
        setTimeout(() => {
          this.router.navigate(["/projecten"]);
        }, 1000)
      }
    })
  }

  deleteProject(e)
  {
    console.log(e.srcElement.id);
    Swal.fire({
      title: "Weet u zeker dat u dit project wilt verwijderen?",
      text: " ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#169898",
      cancelButtonColor: "#BB2D3B",
      confirmButtonText: "Ja",
      cancelButtonText: "Nee"
    }).then((result) => {
      if(result.isConfirmed)
      {
        const data = e.target.id;
        this.projectService.deleteProject(data).subscribe(() => {

        })
        Swal.fire(
          "Het project is succesvol verwijderd",
          " ",
          "success"
        )
        this.router.navigate(["/projecten"]);
      }
    })
  }
}
