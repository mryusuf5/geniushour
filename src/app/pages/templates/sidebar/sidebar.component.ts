import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public userdata: any;
  public username: string
  public profilePicture: string;
  public menuShow: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.userdata = JSON.parse(localStorage.getItem("userdata"));
    this.username = this.userdata[0].student_firstname;
    this.profilePicture = this.userdata[0].student_image;
  }

  public showMenu(e)
  {
    e.srcElement.classList.add("show");
  }

  public logout()
  {
    localStorage.removeItem("userdata");
  }

}
