import { Component, OnInit } from '@angular/core';
import { TeacherService } from "../../services/teacher.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public teacherData: any = JSON.parse(localStorage.getItem("teacher"));
  public fieldId: number = this.teacherData[0].field_id;
  public firstName: string = this.teacherData[0].teacher_firstname;
  public lastName: string = this.teacherData[0].teacher_lastname;
  public prefix: string = this.teacherData[0].teacher_prefix;
  public currentProjects: any = [];
  public currentStudentProject: any = [];
  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.getCurrentProjects()
  }

  public getCurrentProjects()
  {
    this.teacherService.getCurrentProjects(this.fieldId).subscribe((e) => {
      this.currentProjects = e;
      console.log(this.currentProjects);
    })
  }

  public getCurrentStudentProjects()
  {
    this.teacherService.getCurrentStudentProjects(29).subscribe((e) => {
      this.currentStudentProject = e;
    })
  }

}
