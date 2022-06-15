import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";
import { ProjectService} from "../../services/project.service";
import {Chart, registerables} from "chart.js";

@Component({
  selector: 'app-single-student-project',
  templateUrl: './single-student-project.component.html',
  styleUrls: ['./single-student-project.component.scss']
})
export class SingleStudentProjectComponent implements OnInit {

  public singleProject: any;
  public teachers: any;
  public userdata: any = JSON.parse(localStorage.getItem("userdata"));
  public userId: string = this.userdata[0].student_id;
  public projectId: string;
  public messages: any = [];
  public tmpProgress: string = "0";
  public progress: string;
  public progresses: any = [];
  public progressesProgress: any = [];
  public progressesDates: any = [];
  public progressesTeacher: any = [];
  public progressesProgressTeacher: any = [];
  public progressTeacherLatest: string;
  public getProgressLength: any = [];
  public applications: any = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private projectService: ProjectService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((e) => {
      this.projectId = e["projectId"];
    })

    this.getApplicationsByProjectId();
    this.getSingleProject();
    this.getMessages();
    this.getProgress();
    Chart.register(...registerables);
    this.getAllProgresses();
  }

  public getSingleProject()
  {
    this.spinner.show();
    const data = [
      this.userdata[0].student_id,
      this.projectId
    ];
    this.projectService.getStudentProject(data).subscribe((e) => {
      this.singleProject = e;
      this.spinner.hide();
    })
  }

  public getApplicationsByProjectId()
  {
    const data = [
      this.userId,
      this.projectId
    ];
    console.log(data)
    this.projectService.getApplicationsByProjectId(data).subscribe((e) => {
      this.applications = e;
      console.log(this.applications);
    })
  }

  public updateProgress()
  {
    const data = [
      this.userdata[0].student_id,
      this.projectId,
      this.tmpProgress,
      this.progressTeacherLatest
    ];


    Swal.fire({
      title: "Weet u zeker dat u de voortgang wilt opslaan?",
      text: "",
      icon: "info",
      showCancelButton: true,
      cancelButtonText: "Nee",
      confirmButtonText: "Ja",
      confirmButtonColor: "#169898",
      cancelButtonColor: "#BB2D3B",
    }).then((e) => {
      if(e.isConfirmed)
      {
        this.projectService.updateProgress(data).subscribe(() => {
          this.getProgress();
          location.reload();
        });
        Swal.fire(
          "Voortgang opgeslagen.",
          " ",
          "success"
        )
      }
    })
  }

  public getProgress()
  {
    const data = [
      this.userdata[0].student_id,
      this.projectId
    ];
    this.projectService.getLatestProgress(data).subscribe((e) => {
      this.getProgressLength = e;
      if(this.getProgressLength.length <= 0)
      {
        this.progress = "0";
      }
      else
      {
        this.progress = e[0].progress;
        this.tmpProgress = this.progress;
      }
    })
  }

  public getAllProgresses()
  {
    const data = [
      this.userdata[0].student_id,
      this.projectId
    ];
    this.projectService.getAllProgresses(data).subscribe((e) => {
      this.progresses = e;
      if(this.progresses.length <= 0)
      {
        this.progressTeacherLatest = "0";
      }
      else
      {
        this.progresses.forEach((e) => {
          this.progressesProgress.push(e.progress);
          this.progressesDates.push(e.created_at);
          this.progressesTeacher.push(e.teacher);
          this.progressesProgressTeacher.push(e.progress_teacher);
          this.progressTeacherLatest = this.progressesProgressTeacher[this.progressesProgressTeacher.length - 1];
        })
      }
      setTimeout(() => {
        this.createChart();
      }, 500)
    })
    this.createChart();
  }

  public getMessages()
  {
    const data = [
      this.userId,
      this.projectId
    ];
    this.projectService.getMessagesSingleProject(data).subscribe((e) => {
      this.messages = e;
    })
  }

  public createChart()
  {
    new Chart("chart", {
      type: 'line',
      data: {
        labels: this.progressesDates,
        datasets: [{
          label: 'Voortgang leerling',
          data: this.progressesProgress,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },{
          label: 'Voortgang leeraar',
          data: this.progressesProgressTeacher,
          backgroundColor: 'rgba(0, 99, 132, 0.2)',
          borderColor: 'rgba(0, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


  public finishProject(e)
  {
    const data = [
      this.userId,
      e.target.id,
      this.singleProject[0].field_id,
      "1"
    ];
    Swal.fire({
      text: "Weet u zeker dat u dit project wilt afronden?",
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
          location.reload();
        })
      }
    })
  }

  unfinishProject(e)
  {
    const data = [
      this.userId,
      e.target.id
    ];
    Swal.fire({
      title: "Weet u zeker dat u dit project wilt terugzetten?",
      text: "",
      icon: "info",
      showCancelButton: true,
      cancelButtonText: "Nee",
      confirmButtonText: "Ja",
      confirmButtonColor: "#169898",
      cancelButtonColor: "#BB2D3B",
    }).then((e) => {
      if(e.isConfirmed)
      {
        this.spinner.show()
        this.projectService.unfinishProject(data).subscribe(() => {
          this.spinner.hide()
          this.router.navigate(["/home/afgeronde-projecten"])
        });
      }
    })
  }
}
