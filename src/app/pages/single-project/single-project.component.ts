import { Component, OnInit } from '@angular/core';
import { ProjectService} from "../../services/project.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

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

  public submitApplication()
  {
    const data = [
      this.userdata[0].student_id,
      this.projectId,
      this.singleProject[0].field_id
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
        this.projectService.AddApplication(data).subscribe((e) => {
          this.messages = e;
        })
      }
    })
  }
}
