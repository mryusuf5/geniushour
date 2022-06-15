import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from "@angular/router";
import { ProjectService } from "../../services/project.service";
import {FormGroup, FormBuilder, Form} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import Swal from "sweetalert2";
import {Chart, registerables} from "chart.js";

@Component({
  selector: 'app-single-student-project-teacher',
  templateUrl: './single-student-project-teacher.component.html',
  styleUrls: ['./single-student-project-teacher.component.scss']
})
export class SingleStudentProjectTeacherComponent implements OnInit {

  public studentId: string;
  public projectId: string;
  public messages: any = [];
  public message: string;
  public apiMessage: any = [];
  public teacherData: any = JSON.parse(localStorage.getItem("teacher"));
  public teacherId: string = this.teacherData[0].teacher_id;
  public tmpProgress: string = "0";
  public progress: string;
  public progresses: any = [];
  public progressesProgress: any = [];
  public progressesDates: any = [];
  public progressesTeacher: any = [];
  public progressesProgressTeacher: any = [];
  public getProgressLength: any = [];
  public progressStudentLatest: string;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private projectService: ProjectService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((e) => {
      this.studentId = e["studentId"];
      this.projectId = e["projectId"];
    })
    this.getMessages();
    this.getProgress();
    this.getAllProgresses();
    Chart.register(...registerables);
  }

  public goBack(e)
  {
    this.router.navigate(["/studenten/student-projecten"], {queryParams: {studentId: this.studentId}});
  }

  public getMessages()
  {
    const data = [
      this.studentId,
      this.projectId
    ];
    this.spinner.show();
    this.projectService.getMessagesSingleProject(data).subscribe((e) => {
      this.messages = e;
      this.spinner.hide();
    })
  }

  public createMessage()
  {
    const data = [
      this.message,
      this.studentId,
      this.teacherId,
      this.projectId
    ];
    Swal.fire({
      title: "Weet je zeker dat je dit bericht wilt versturen?",
      icon: "info",
      confirmButtonText: "Ja",
      cancelButtonText: "Nee",
      showCancelButton: true,
      confirmButtonColor: "#169898",
      cancelButtonColor: "#BB2D3B"
    }).then((result) => {
      if(result.isConfirmed)
      {
        Swal.fire(
          "Bericht verstuurd.",
          "",
          "success"
        )
        this.projectService.sendMessage(data).subscribe((e) => {
          this.apiMessage = e;
          this.message = "";
          this.getMessages();
        })
      }
    })
  }

  public getAllProgresses()
  {
    const data = [
      this.studentId,
      this.projectId
    ];
    this.projectService.getAllProgresses(data).subscribe((e) => {
      this.progresses = e;
      if(this.progresses.length <= 0)
      {
        this.progressStudentLatest = "0";
      }
      else
      {
        this.progresses.forEach((e) => {
          this.progressesProgress.push(e.progress);
          this.progressesDates.push(e.created_at);
          this.progressesTeacher.push(e.teacher);
          this.progressesProgressTeacher.push(e.progress_teacher);
          this.progressStudentLatest = this.progressesProgress[this.progressesProgress.length - 1];
        })
      }

      setTimeout(() => {
        this.createChart();
      }, 500)
    })
  }

  public getProgress()
  {
    const data = [
      this.studentId,
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
        this.progress = e[0].progress_teacher;
      }

      this.tmpProgress = this.progress;
    })
  }

  public updateProgress()
  {
    const data2 = [
      "Uw project voortgang is aangepast.",
      this.studentId,
      this.teacherId,
      this.projectId,
      "1"
    ]
    const data = [
      this.studentId,
      this.projectId,
      this.progressStudentLatest,
      this.tmpProgress
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
        this.projectService.sendMessage(data2).subscribe(() => {})
        this.projectService.updateProgress(data).subscribe(() => {
          this.getProgress();
          location.reload()
        });
        Swal.fire(
          "Voortgang opgeslagen.",
          " ",
          "success"
        )
      }
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

  public deleteProject()
  {
    const data = [
      this.studentId,
      this.projectId
    ]
    Swal.fire({
      title: "Weet u zeker dat u deze project wilt verwijderen?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Nee",
      confirmButtonText: "Ja",
      confirmButtonColor: "#169898",
      cancelButtonColor: "#BB2D3B",
    }).then((e) => {
      if(e.isConfirmed)
      {
        this.projectService.deleteStudentProject(data).subscribe((e) => {
          this.router.navigate(["/studenten/student-projecten"], {queryParams: {studentId: this.studentId}})
        })
        Swal.fire(
          "Project verwijderd",
          " ",
          "success"
        )
      }
    })
  }
}
