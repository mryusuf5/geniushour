import { Component, OnInit } from '@angular/core';
import { StudentService } from "../../services/student.service";
import { ProjectService } from "../../services/project.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-single-student',
  templateUrl: './single-student.component.html',
  styleUrls: ['./single-student.component.scss']
})
export class SingleStudentComponent implements OnInit {

  public student:any = [];
  public classes: any = [];
  public messages: any;
  public formStudentFirstName: string;
  public formStudentLastName: string;
  public formStudentEmail: string;
  public formStudentPrefix: string;
  public formStudentHours: string;
  public formStudentClass: string;
  public projects: any = [];

  public studentId: any;

  constructor(private studentService: StudentService,
              private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((e) => {
      this.studentId = e["studentId"];
    });

    this.studentService.getAllClasses().subscribe((e) => {
      this.classes = e;
    })
    this.spinner.show();
    this.studentService.getSingleStudent(this.studentId).subscribe((e) => {
      this.student = e;
      this.formStudentFirstName = this.student[0].student_firstname;
      this.formStudentLastName = this.student[0].student_lastname;
      this.formStudentEmail = this.student[0].student_email;
      this.formStudentPrefix = this.student[0].student_prefix;
      this.formStudentHours = this.student[0].student_hours;
      this.formStudentClass = this.student[0].class_id;
      this.spinner.hide();
    })
  }

  public back()
  {
    this.router.navigate(["/studenten/student-projecten"], {queryParams: {studentId: this.studentId}});
  }

  public editStudent(e)
  {
    const data = [
      e.target.id,
      this.formStudentFirstName,
      this.formStudentLastName,
      this.formStudentEmail,
      this.formStudentPrefix,
      this.formStudentHours,
      this.formStudentClass
    ]
    Swal.fire({
      title: "Weet u zeker dat u deze student wilt aanpassen?",
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
        this.studentService.editStudent(data).subscribe((e) => {
          this.messages = e;
        })
        Swal.fire(
          "Student is aangepast",
          " ",
          "success"
        )
        setTimeout(() => {
          this.router.navigate(["/studenten"]);
        }, 1000)
      }
    })
  }

  public deleteStudent(e)
  {
    const data = e.srcElement.id;

    Swal.fire({
      title: "Weet u zeker dat u deze student wilt verwijderen?",
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
        this.studentService.deleteStudent(data).subscribe((e) => {
        })
        Swal.fire(
          "Student is verwijderd",
          " ",
          "success"
        )
        setTimeout(() => {
          this.router.navigate(["/studenten"]);
        }, 1000)
      }
    })
  }
}
