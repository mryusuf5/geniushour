import { Component, OnInit } from '@angular/core';
import { ProjectService} from "../../services/project.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.scss']
})
export class SingleProjectComponent implements OnInit {

  public projectId: string;
  public singleProject: any;
  public teachers: any;
  public messages: any;
  public userdata: any = JSON.parse(localStorage.getItem("userdata"));
  public userId: string = this.userdata[0].student_id;
  public applications: any = [];
  public disableApplication: boolean = false;
  public studentProject: any = [];
  public projectSupplies: any = [];

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((p) => {
      this.projectId = p["projectId"];
    })
    const data = {"projectId" : this.projectId };
    this.spinner.show();
    this.projectService.GetSingleProject(data).subscribe((e) => {
      this.singleProject = e;
      this.checkstudentApplication()
    });

    this.getSupplies();

    this.projectService.GetTeachersForSingleProject(data).subscribe((e) =>{
      this.teachers = e;
    })
    this.getStudentProject();
  }

  public getSupplies()
  {
    this.projectService.getProjectSupplies(this.projectId).subscribe((e) => {
      this.projectSupplies = e;
    })
  }

  public checkstudentApplication()
  {
    const data = [
      this.userId,
      this.projectId
    ]
    this.projectService.getApplicationsByStudentId(data).subscribe((e) => {
      this.applications = e;
      this.applications.forEach((e) => {
        if(e.project_id == this.projectId)
        {
          this.disableApplication = true;
        }
      })
      this.spinner.hide();
    })
  }

  public getStudentProject()
  {
    const data = [
      this.userdata[0].student_id,
      this.projectId
    ]
    this.projectService.getStudentProject(data).subscribe((e) => {
      this.studentProject = e;
      if(this.studentProject.length > 0)
      {
        this.disableApplication = true;
      }
    })
  }

  public submitApplication()
  {
    const data = [
      this.userdata[0].student_id,
      this.projectId,
      this.singleProject[0].field_id,
      "0"
    ];
    Swal.fire({
      text: "Weet je zeker dat je een verzoek wilt sturen naar de leraar?",
      icon: "info",
      showCancelButton: true,
      cancelButtonText: "nee",
      confirmButtonColor: "#169898",
      cancelButtonColor: "#BB2D3B",
      confirmButtonText: "ja"
    }).then((result) => {
      if(result.isConfirmed)
      {
        Swal.fire(
          "Succesvol aangevraagt",
          "",
          "success"
        );
        this.disableApplication = true;
        this.projectService.AddApplication(data).subscribe((e) => {
          this.messages = e;
        })
      }
    })
  }
}
