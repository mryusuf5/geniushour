import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../../services/student.service";

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
  public notifications: any;
  public notificationsLength: number = 0;
  public userData: any = JSON.parse(localStorage.getItem("userdata"));
  public userId: string = this.userData[0].student_id;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.userdata = JSON.parse(localStorage.getItem("userdata"));
    this.username = this.userdata[0].student_firstname;
    this.profilePicture = this.userdata[0].student_image;
    this.getMessages();
  }

  public showMenu(e)
  {
    e.target.classList.add("show");
  }

  public logout()
  {
    localStorage.removeItem("userdata");
  }

  public getMessages()
  {
    const data = this.userId;
    this.studentService.getMessagesStudent(data).subscribe((e) => {
      this.notifications = e;
      this.notifications.forEach((n) => {
        if(n.read_message == "0")
        {
          this.notificationsLength++;
        }
      })
    })
  }

}
