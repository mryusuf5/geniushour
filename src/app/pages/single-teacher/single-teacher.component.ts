import { Component, OnInit } from '@angular/core';
import { TeacherService } from "../../services/teacher.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-single-teacher',
  templateUrl: './single-teacher.component.html',
  styleUrls: ['./single-teacher.component.scss']
})
export class SingleTeacherComponent implements OnInit {

  public teacher: any;
  public teacherId: any;
  public formTeacherFirstName: string;
  public formTeacherLastName: string;
  public formTeacherPrefix: string;
  public formTeacherEmail: string;
  public messages: any;

  constructor(private teacherService: TeacherService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((e) => {
      this.teacherId = e["leraarId"];
    });

    this.teacherService.getSingleTeacher(this.teacherId).subscribe((e) => {
      this.teacher = e;
      console.log(this.teacher);
      this.formTeacherFirstName = this.teacher[0].teacher_firstname;
      this.formTeacherLastName = this.teacher[0].teacher_lastname;
      this.formTeacherPrefix = this.teacher[0].teacher_prefix;
      this.formTeacherEmail = this.teacher[0].teacher_email;
    })
  }

  public editTeacher(e)
  {
    const data = [
      e.srcElement.id,
      this.formTeacherFirstName,
      this.formTeacherLastName,
      this.formTeacherPrefix,
      this.formTeacherEmail
    ];

    Swal.fire({
      title: "Weet u zeker dat u deze leraar wilt aanpassen?",
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
        this.teacherService.editTeacher(data).subscribe((e) => {
          this.messages = e;
        })
        Swal.fire(
          "Leraar is aangepast",
          " ",
          "success"
        )
        setTimeout(() => {
          this.router.navigate(["/studenten"]);
        }, 1000)
      }
    })
  }

  public deleteTeacher(e)
  {
    const data = e.srcElement.id;

    Swal.fire({
      title: "Weet u zeker dat u deze leraar wilt verwijderen?",
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
        this.teacherService.deleteTeacher(data).subscribe((e) => {
        })
        Swal.fire(
          "Leraar is verwijderd",
          " ",
          "success"
        )
        setTimeout(() => {
          this.router.navigate(["/leraren"]);
        }, 1000)
      }
    })
  }

}
