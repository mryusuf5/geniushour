import { Component, OnInit } from '@angular/core';
import { TeacherService} from "../../services/teacher.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import {FormGroup, FormBuilder} from "@angular/forms";
import { ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  public teachers: any = [];
  public searchName: string;
  public selectedSearch: string = "voornaam";
  public reverse: boolean = false;
  public page: number = 1;
  public teacherId: boolean = true;
  public teacherName: boolean = false;
  public teacherEmail: boolean = false;
  public showModal: boolean = false;
  public teacherField: boolean = false;
  public teacherForm: FormGroup;
  public messages: any;
  public error: string;
  public fields: any = [];

  constructor(private teacherService: TeacherService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private form: FormBuilder,
              private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getAllTeachersId();
    this.teacherForm = this.form.group({
      teacherName: [""],
      teacherLastName: [""],
      teacherPrefix: [""],
      teacherEmail: [""],
      teacherField: [""]
    })
  }

  public triggerModal()
  {
    this.showModal = true;
    this.projectService.GetAllFields().subscribe((e) => {
      this.fields = e;
    })
  }

  public search()
  {
    if(this.selectedSearch == "voornaam" && this.searchName != "")
    {
      this.teachers = this.teachers.filter(res => {
        return res.teacher_firstname.toLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
    else if(this.selectedSearch == "achternaam" && this.searchName != "")
    {
      this.teachers = this.teachers.filter(res => {
        return res.teacher_lastname.toLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
    else if(this.selectedSearch == "email" && this.searchName != "")
    {
      this.teachers = this.teachers.filter(res => {
        return res.teacher_email.toLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
    else if(this.selectedSearch == "vak" && this.searchName != "")
    {
      this.teachers = this.teachers.filter(res => {
        return res.field_name.toLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
    else if(this.searchName == "")
    {
      this.getAllTeachersId();
    }
  }

  public getAllTeachersName()
  {
    if(this.teacherName)
    {
      this.teacherService.getAllTeachersNameDesc().subscribe((e) => {
        this.teachers = e;
        this.spinner.hide();this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
      this.teacherName = false;
    }
    else
    {
      this.teacherService.getAllTeachersNameAsc().subscribe((e) => {
        this.teachers = e;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
      this.teacherName = true;
    }
  }

  public getAllTeachersMail()
  {
    if(this.teacherEmail)
    {
      this.teacherService.getAllTeachersEmailDesc().subscribe((e) => {
        this.teachers = e;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
      this.teacherEmail = false;
    }
    else
    {
      this.teacherService.getAllTeachersEmailAsc().subscribe((e) => {
        this.teachers = e;
      })
      this.teacherEmail = true;
    }
  }

  public getAllTeachersField()
  {
    if(this.teacherField)
    {
      this.teacherService.getAllTeachersFieldAsc().subscribe((e) => {
        this.teachers = e;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
      this.teacherField = false;
    }
    else
    {
      this.teacherService.getAllTeachersFieldDesc().subscribe((e) => {
        this.teachers = e;
      })
      this.teacherField = true;
    }
  }

  public getAllTeachersId()
  {
    if(this.teacherId)
    {
      this.spinner.show();
      this.teacherService.getAllTeachers().subscribe((e) => {
        this.teachers = e;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
      this.teacherId = false;
    }
    else
    {
      this.spinner.show();
      this.teacherService.getAllTeachersAsc().subscribe((e) => {
        this.teachers = e;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
      this.teacherId = true;
    }
  }

  public gotoTeacher(e)
  {
    this.router.navigate(["/leraren/leraar-edit"], {queryParams: {leraarId: e.srcElement.id}});
  }

  public addNewTeacher()
  {
    const data = [];
    data.push(this.teacherForm.value.teacherName,
      this.teacherForm.value.teacherLastName,
      this.teacherForm.value.teacherPrefix,
      this.teacherForm.value.teacherEmail,
      this.teacherForm.value.teacherField)

    this.teacherService.addTeacher(data).subscribe((e) => {
      this.messages = e;
      console.log(this.messages);
      if(this.messages.error)
      {
        this.error = this.messages.error;
      }
      if(this.messages.success)
      {
        this.showModal = false;
        this.getAllTeachersId();
        this.teacherForm.get("teacherName").reset(),
          this.teacherForm.get("teacherLastName").reset(),
          this.teacherForm.get("teacherPrefix").reset(),
          this.teacherForm.get("teacherEmail").reset(),
          this.teacherForm.get("teacherField").reset()
      }
    })
  }
}
