import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../services/project.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  public showModal: boolean;
  public applications: any = [];
  public singleApplication: any;
  public teacher: any = JSON.parse(localStorage.getItem("teacher"));
  public teacherId: string = this.teacher[0].teacher_id;
  public singleApplicationId: string;
  public data: any = [];
  public reason: string = "";

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getApplications();
  }

  public getApplications()
  {
    this.projectService.getApplicationsByField(this.teacher[0].field_id).subscribe((e) => {
      this.applications = e;
    })
  }

  public triggerModal(e)
  {
    this.showModal = true;
    this.singleApplicationId = e.target.id;
    this.projectService.getApplicationById(e.target.id).subscribe((e) => {
      this.singleApplication = e;
    })
  }

  public acceptApplication()
  {
    const data2 = [
      "Uw verzoek is geaccepteerd.",
      this.singleApplication[0].student_id,
      this.teacherId,
      this.singleApplication[0].project_id,
      "1"
    ];

    if(this.singleApplication[0].finish == "0")
    {
      this.data.push(
        this.singleApplication[0].student_id,
        this.singleApplication[0].project_id,
        this.singleApplication[0].field_id,
        this.singleApplication[0].application_id
      );
    }
    else if(this.singleApplication[0].finish == "1")
    {
      this.data.push(
        this.singleApplication[0].student_id,
        this.singleApplication[0].project_id,
        this.singleApplication[0].project_duration
      );
    }


    Swal.fire({
      title: "Weet u zeker dat u dit verzoek wilt accepteren?",
      text: "",
      icon: "info",
      showCancelButton: true,
      cancelButtonText: "Nee",
      confirmButtonText: "Ja",
      confirmButtonColor: "#169898",
      cancelButtonColor: "#BB2D3B"
    }).then((result) => {
      if(result.isConfirmed)
      {
        if(this.singleApplication[0].finish == "0")
        {
          this.projectService.acceptApplication(this.data).subscribe(() => {
            this.projectService.sendMessage(data2).subscribe(() => {})
            this.getApplications();
            this.showModal = false;
          });
        }
        else if(this.singleApplication[0].finish == "1")
        {
          this.projectService.finishProject(this.data).subscribe((e) => {
            this.projectService.sendMessage(data2).subscribe(() => {})
            this.projectService.denyApplication(this.singleApplicationId).subscribe(() => {})
            this.getApplications();
            this.showModal = false;
            Swal.fire(
              "Succesvol geaccepteerd",
              "",
              "success"
            )
            this.data = [];
          })
        }


      }
    })
  }

  public denyApplication()
  {
    const data2 = [
      "Uw verzoek is geweigerd. \n" + this.reason,
      this.singleApplication[0].student_id,
      this.teacherId,
      this.singleApplication[0].project_id,
      1,
      1
    ];
    Swal.fire({
      title: "Weet u zeker dat u dit verzoek wilt weigeren?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Nee",
      confirmButtonText: "Ja",
      confirmButtonColor: "#169898",
      cancelButtonColor: "#BB2D3B"
    }).then((result) => {
      if(result.isConfirmed)
      {
        this.projectService.denyApplication(this.singleApplicationId).subscribe(() => {});
        this.projectService.sendMessage(data2).subscribe(() => {
          this.getApplications();
          this.showModal = false;
        })
        Swal.fire(
          "Succesvol geweigerd",
          "",
          "success"
        )
      }
    })
  }

}
