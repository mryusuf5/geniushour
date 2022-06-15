import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import { StudentService} from "../../services/student.service";
import { NgxSpinnerService} from "ngx-spinner";
import { Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  public students: any = [];
  public classes: any = [];
  public searchName: string;
  public selectedSearch: string = "klasnaam";
  public reverse: boolean = false;
  public page: number = 1;
  public studentId: boolean = true;
  public className: boolean = false;
  public classYear: boolean = false;
  public showModal: boolean = false;
  public classForm: FormGroup;
  public messages: any;
  public error: string;
  constructor(private studentService: StudentService,
              private form: FormBuilder,
              private spinner: NgxSpinnerService,
              private route: Router) { }

  ngOnInit(): void {
    this.classForm = this.form.group({
      className: [""],
      classYear: [""]
    })
    this.getAllClassesId()
  }

  public search()
  {
    if(this.selectedSearch == "klasnaam" && this.searchName != "")
    {
      this.classes = this.classes.filter(res => {
        return res.class_name.toLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
    else if(this.selectedSearch == "jaar" && this.searchName != "")
    {
      this.classes = this.classes.filter(res => {
        return res.class_year.toLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
    else if(this.searchName == "")
    {
      this.getAllClassesId();
    }
  }

  public triggerModal()
  {
    this.showModal = true;

  }

  public gotoClass(e)
  {
    this.route.navigate(["/klassen/klas"], { queryParams: {klasId: e.target.id}});
  }

  public getAllClassesName()
  {
    if(this.className)
    {
      this.spinner.show();
      this.studentService.getAllClassesNameAsc().subscribe((e) => {
        this.classes = e;
        this.spinner.hide();
        this.className = false;
      })
    }
    else
    {
      this.spinner.show();
      this.studentService.getAllClassesNameDesc().subscribe((e) => {
        this.classes = e;
        this.spinner.hide();
        this.className = true;
      })
    }

  }

  public getAllClassesYear()
  {
    if(this.classYear)
    {
      this.spinner.show();
      this.studentService.getAllClassesYearAsc().subscribe((e) => {
        this.classes = e;
        this.spinner.hide();
        this.classYear = false;
      })
    }
    else
    {
      this.spinner.show();
      this.studentService.getAllClassesYearDesc().subscribe((e) => {
        this.classes = e;
        this.spinner.hide();
        this.classYear = true;
      })
    }
  }

  public getAllClassesId()
  {
    this.studentService.getAllClasses().subscribe((e) => {
      this.classes = e;
    })
  }

  public addNewClass()
  {
    const data = [];

    data.push(
      this.classForm.value.className,
      this.classForm.value.classYear
    );

    this.studentService.addClass(data).subscribe((e) => {
      this.messages = e
      if(this.messages.error)
      {
        this.error = this.messages.error
      }
      else if(this.messages.success)
      {
        this.classForm.get("className").reset();
        this.classForm.get("classYear").reset();
        this.showModal = false;
        this.getAllClassesId();
      }
    })
  }

}
