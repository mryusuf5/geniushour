import { Component, OnInit } from '@angular/core';
import { StudentService } from "../../services/student.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  public students: any = [];
  public classes: any = [];
  public searchName: string;
  public selectedSearch: string = "voornaam";
  public reverse: boolean = false;
  public page: number = 1;
  public studentId: boolean = true;
  public studentName: boolean = false;
  public studentEmail: boolean = false;
  public studentHours: boolean = false;
  public studentNumber: boolean = false;
  public showModal: boolean = false;
  public studentForm: FormGroup;
  public messages: any;
  public error: string;

  constructor(private studentService: StudentService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private form: FormBuilder) { }

  ngOnInit(): void {
    this.getAllStudentsId();
    this.studentForm = this.form.group({
      studentName: [""],
      studentLastName: [""],
      studentPrefix: [""],
      studentNumber: [""],
      studentHours: ["200"],
      studentEmail: [""],
      studentClass: [""]
    })
  }

  public triggerModal()
  {
    this.showModal = true;
    this.studentService.getAllClasses().subscribe((e) => {
      this.classes = e;
    })
  }

  public addNewStudent()
  {
    const data = [];

    data.push(this.studentForm.value.studentName,
      this.studentForm.value.studentLastName,
      this.studentForm.value.studentPrefix,
      this.studentForm.value.studentNumber,
      this.studentForm.value.studentHours,
      this.studentForm.value.studentEmail,
      this.studentForm.value.studentClass)
    this.spinner.show();
    this.studentService.addStudent(data).subscribe((e) => {
      this.messages = e;
      if(this.messages.error)
      {
        this.spinner.hide();
        this.error = this.messages.error;
      }
      if(this.messages.success)
      {
        this.spinner.hide();
        this.showModal = false;
        this.getAllStudentsId();
        this.studentForm.get("studentName").reset(),
        this.studentForm.get("studentLastName").reset(),
        this.studentForm.get("studentPrefix").reset(),
        this.studentForm.get("studentNumber").reset(),
        this.studentForm.get("studentHours").value("200"),
        this.studentForm.get("studentEmail").reset(),
        this.studentForm.get("studentClass").reset()
      }
    })
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
      this.getAllStudentsId();
    }
  }

  public getAllStudentsName()
  {
    if(this.studentName)
    {
      this.spinner.show();
      this.studentService.getAllStudentsNameDesc().subscribe((e) => {
        this.students = e;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
      this.studentName = false;
    }
    else
    {
      this.spinner.show();
      this.studentService.getAllStudentsNameAsc().subscribe((e) => {
        this.students = e;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
      this.studentName = true;
    }
  }

  public getAllStudentsNumber()
  {
    if(this.studentNumber)
    {
      this.spinner.show();
      this.studentService.getAllStudentsNumberDesc().subscribe((e) => {
        this.students = e;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
      this.studentNumber = false;
    }
    else
    {
      this.spinner.show();
      this.studentService.getAllStudentsNumberAsc().subscribe((e) => {
        this.students = e;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
      this.studentNumber = true;
    }
  }

  public getAllStudentsMail()
  {
    if(this.studentEmail)
    {
      this.spinner.show();
      this.studentService.getAllStudentsEmailDesc().subscribe((e) => {
        this.students = e;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
      this.studentEmail = false;
    }
    else
    {
      this.spinner.show();
      this.studentService.getAllStudentsEmailAsc().subscribe((e) => {
        this.students = e;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
      this.studentEmail = true;
    }
  }

  public getAllStudentsId()
  {
    if(this.studentId)
    {
      this.spinner.show();
      this.studentService.getAllStudents().subscribe((e) => {
        this.students = e;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
      this.studentId = false;
    }
    else
    {
      this.spinner.show();
      this.studentService.getAllStudentsAsc().subscribe((e) => {
        this.students = e;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
      this.studentId = true;
    }
  }
  public getAllStudentsHours()
  {
    if(this.studentHours)
    {
      this.spinner.show();
      this.studentService.getAllStudentsHoursDesc().subscribe((e) => {
        this.students = e;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
      this.studentHours = false;
    }
    else
    {
      this.spinner.show();
      this.studentService.getAllStudentsHoursAsc().subscribe((e) => {
        this.students = e;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
      this.studentHours = true;
    }
  }

  public gotoStudent(e)
  {
    this.router.navigate(["/studenten/student-projecten"], {queryParams: {studentId: e.srcElement.id}});
  }
}
