import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    this.userdata = JSON.parse(localStorage.getItem("teacher"));
    this.username = this.userdata[0].teacher_firstname;
    this.profilePicture = this.userdata[0].teacher_image;
  }

  public showMenu(e)
  {
    e.srcElement.classList.add("show");
  }

  public logout()
  {
    localStorage.removeItem("teacher");
  }

}
