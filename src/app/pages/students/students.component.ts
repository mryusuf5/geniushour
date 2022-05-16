import { Component, OnInit } from '@angular/core';
import { StudentService } from "../../services/student.service";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  public students: any = [];
  public searchName: string;
  public selectedSearch: string = "Student naam";
  public reverse: boolean = false;
  public page: number = 1;
  public studentId: boolean = true;
  public studentName: boolean = false;
  public studentEmail: boolean = false;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getAllStudentsId();
  }

  public triggerModal()
  {

  }

  public search()
  {
    if(this.selectedSearch == "Student naam" && this.searchName != "")
    {
      this.students = this.students.filter(res => {
        return res.student_firstname.toLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
    else if(this.selectedSearch == "Student achternaam" && this.searchName != "")
    {
      this.students = this.students.filter(res => {
        return res.student_lastname.toLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
    else if(this.selectedSearch == "Student email" && this.searchName != "")
    {
      this.students = this.students.filter(res => {
        return res.student_email.toLowerCase().match(this.searchName.toLocaleLowerCase());
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
      this.studentService.getAllStudentsNameDesc().subscribe((e) => {
        this.students = e;
      })
      this.studentName = false;
    }
    else
    {
      this.studentService.getAllStudentsNameAsc().subscribe((e) => {
        this.students = e;
      })
      this.studentName = true;
    }
  }

  public getAllStudentsMail()
  {
    if(this.studentEmail)
    {
      this.studentService.getAllStudentsEmailDesc().subscribe((e) => {
        this.students = e;
      })
      this.studentEmail = false;
    }
    else
    {
      this.studentService.getAllStudentsEmailAsc().subscribe((e) => {
        this.students = e;
      })
      this.studentEmail = true;
    }
  }

  public getAllStudentsId()
  {
    if(this.studentId)
    {
      this.studentService.getAllStudents().subscribe((e) => {
        this.students = e;
      })
      this.studentId = false;
    }
    else
    {
      this.studentService.getAllStudentsAsc().subscribe((e) => {
        this.students = e;
      })
      this.studentId = true;
    }
  }

  public gotoStudent(e)
  {

  }
}
