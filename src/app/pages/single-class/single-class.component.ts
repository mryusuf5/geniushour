import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import { StudentService} from "../../services/student.service";
import { NgxSpinnerService} from "ngx-spinner";
import { Router, ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-single-class',
  templateUrl: './single-class.component.html',
  styleUrls: ['./single-class.component.scss']
})
export class SingleClassComponent implements OnInit {

  public students: any = [];
  public allStudents: any = [];
  public searchName: string;
  public allSearchName: string;
  public selectedSearch: string = "voornaam";
  public allSelectedSearch: string = "voornaam";
  public page: number = 1;
  public error: string;
  public classId: string;
  public showModal:boolean = false;
  public className: string;
  public addStudents: any = [];
  constructor(private studentService: StudentService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((e) => {
      this.classId = e["klasId"];
    })
    this.getAllStudents();
    this.studentService.getSingleClass(this.classId).subscribe((e) => {
      this.className = e[0].class_name;
    })
  }

  public getAllStudents()
  {
    const data = this.classId;
    this.studentService.getStudentsClass(data).subscribe((e) => {
      this.students = e;
    })
  }

  public getAllStudentsAll()
  {
    this.studentService.getAllStudents().subscribe((e) => {
      this.allStudents = e;
    })
  }

  public addNewStudent(e)
  {
    const data = [
      this.classId,
      e.target.id
    ];

    Swal.fire({
      title: "Weet u zeker dat u deze student wilt toevoegen aan deze klas?",
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
        this.studentService.setStudentClass(data).subscribe(() => {
          Swal.fire(
            "Student is toegevoegd aan de klas",
            " ",
            "success"
          )
          this.getAllStudents();
          this.showModal = false;
        })
      }
    })
  }

  public gotoStudent(e)
  {
    this.router.navigate(["/studenten/student-projecten"], {queryParams: {studentId: e.target.id}})
  }

  public search()
  {
    if(this.selectedSearch == "voornaam" && this.searchName != "")
    {
      this.students = this.students.filter(res => {
        return res.student_firstname.toLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
    else if(this.selectedSearch == "achternaam" && this.searchName != "")
    {
      this.students = this.students.filter(res => {
        return res.student_lastname.toLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
    else if(this.selectedSearch == "email" && this.searchName != "")
    {
      this.students = this.students.filter(res => {
        return res.student_email.toLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
    else if(this.selectedSearch == "studentnummer" && this.searchName != "")
    {
      this.students = this.students.filter(res => {
        return res.student_number.toLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
    else if(this.selectedSearch == "klas" && this.searchName != "")
    {
      this.students = this.students.filter(res => {
        return res.class_name.toLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
    else if(this.searchName == "")
    {
      this.getAllStudents();
    }
  }

  public searchAll()
  {
    if(this.allSelectedSearch == "voornaam" && this.allSearchName != "")
    {
      this.allStudents = this.allStudents.filter(res => {
        return res.student_firstname.toLowerCase().match(this.allSearchName.toLocaleLowerCase());
      })
    }
    else if(this.allSelectedSearch == "achternaam" && this.allSearchName != "")
    {
      this.allStudents = this.allStudents.filter(res => {
        return res.student_lastname.toLowerCase().match(this.allSearchName.toLocaleLowerCase());
      })
    }
    else if(this.allSelectedSearch == "email" && this.allSearchName != "")
    {
      this.allStudents = this.allStudents.filter(res => {
        return res.student_email.toLowerCase().match(this.allSearchName.toLocaleLowerCase());
      })
    }
    else if(this.allSelectedSearch == "studentnummer" && this.allSearchName != "")
    {
      this.allStudents = this.allStudents.filter(res => {
        return res.student_number.toLowerCase().match(this.allSearchName.toLocaleLowerCase());
      })
    }
    else if(this.allSelectedSearch == "klas" && this.allSearchName != "")
    {
      this.allStudents = this.allStudents.filter(res => {
        return res.class_name.toLowerCase().match(this.allSearchName.toLocaleLowerCase());
      })
    }
    else if(this.allSearchName == "")
    {
      this.getAllStudentsAll();
    }
  }

  public triggerModal()
  {
    this.showModal = true;
    this.getAllStudentsAll();
  }

  public removeStudent(e)
  {
    const data = e.target.id;

    Swal.fire({
      title: "Weet u zeker dat u deze student uit deze klas wilt verwijderen?",
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
        this.studentService.deleteFromClass(data).subscribe(() => {
          Swal.fire(
            "Student is uit de verwijderd",
            " ",
            "success"
          )
          this.getAllStudents();
        })
      }
    })
  }

  public deleteClass()
  {
    const data = this.classId;
    Swal.fire({
      title: "Weet u zeker dat u deze klas wilt verwijderen?",
      text: "Alle leerlingen die in deze klas zitten worden ook verwijderd.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Nee",
      confirmButtonText: "Ja",
      confirmButtonColor: "#169898",
      cancelButtonColor: "#BB2D3B",
    }).then((e) => {
      if(e.isConfirmed)
      {
        this.studentService.deleteClass(data).subscribe(() => {
          Swal.fire(
            "Klas verwijderd",
            " ",
            "success"
          )
          this.router.navigate(["klassen"]);
        })
      }
    })
  }
}
