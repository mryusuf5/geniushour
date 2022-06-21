import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../../services/project.service";

@Component({
  selector: 'app-sidebar-teacher',
  templateUrl: './sidebar-teacher.component.html',
  styleUrls: ['./sidebar-teacher.component.scss']
})
export class SidebarTeacherComponent implements OnInit {

  public userdata: any;
  public username: string
  public profilePicture: string;
  public menuShow: boolean = false;
  public teacher: any = JSON.parse(localStorage.getItem("teacher"));
  public applications: any = [];
  public notifications: string;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.userdata = JSON.parse(localStorage.getItem("teacher"));
    this.username = this.userdata[0].teacher_firstname;
    this.profilePicture = this.userdata[0].teacher_image;
    this.getApplications()
    setInterval((e) => {
      this.getApplications();
    }, 10000)

  }

  public showMenu(e)
  {
    e.target.classList.add("show");
  }

  public logout()
  {
    localStorage.removeItem("teacher");
  }

  public getApplications()
  {
    this.projectService.getApplicationsByField(this.teacher[0].field_id).subscribe((e) => {
      this.applications = e;
      this.notifications = this.applications.length.toString();
    })
  }

}
