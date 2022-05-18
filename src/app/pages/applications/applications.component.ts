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
  public singleApplicationId: string;

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
    this.singleApplicationId = e.srcElement.id;
    this.projectService.getApplicationById(e.srcElement.id).subscribe((e) => {
      this.singleApplication = e;
      console.log(this.singleApplication);
    })
  }

  public acceptApplication()
  {
    const data = [
      this.singleApplication[0].student_id,
      this.singleApplication[0].project_id,
      this.singleApplication[0].field_id,
      this.singleApplication[0].application_id
    ];
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
        this.projectService.acceptApplication(data).subscribe(() => {});
        Swal.fire(
          "Succesvol geaccepteerd",
          "",
          "success"
        )
        this.showModal = false;
        setTimeout(() => {
          this.getApplications();
        }, 1000)
      }
    })
  }

  public denyApplication()
  {
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
        Swal.fire(
          "Succesvol geweigerd",
          "",
          "success"
        )
        this.showModal = false;
        this.getApplications();
      }
    })
  }

}
