import { Component, OnInit } from '@angular/core';
import { StudentService} from "../../services/student.service";
import { NgxSpinnerService} from "ngx-spinner";
import { Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  public userdata: any = JSON.parse(localStorage.getItem("userdata"));
  public studentId: string = this.userdata[0].student_id;
  public messages: any = [];
  public selectedSearch: string = "voornaam";
  public searchName: string;
  public page: number = 1;
  public showModal: boolean = false;
  public singleMessage: any = [];
  constructor(private studentService: StudentService,
              private spinner:NgxSpinnerService,
              private router: Router) { }

  ngOnInit(): void {
    this.getMessages();
  }

  public search()
  {

  }

  public openMessage(e)
  {
    this.studentService.getSingleMessage(e.target.id).subscribe((e) => {
      this.singleMessage = e;
    })
    this.showModal = true;
  }

  public getMessages()
  {
    this.spinner.show();
    this.studentService.getMessagesStudent(this.studentId).subscribe((e) => {
      this.messages = e;
      this.spinner.hide();
    })
  }

  public deleteMessage(e)
  {
    const data = [
      this.studentId,
      e.target.id
    ];
    Swal.fire({
      title: "Weet u zeker dat u dit bericht wilt verwijderen?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Nee",
      confirmButtonText: "Ja",
      confirmButtonColor: "#169898",
      cancelButtonColor: "#BB2D3B"
    }).then((result) => {
      if(result.isConfirmed)
      {
        Swal.fire(
          "Succesvol verwijderd",
          "",
          "success"
        )
        this.studentService.deleteMessage(data).subscribe(() => {
          this.getMessages();
        });
      }
    })
  }

  public gotoProject(e)
  {
    this.router.navigate(["/home/mijn-projecten/project"], {queryParams: {projectId: e.target.id}});
  }

  public markRead(e)
  {
    this.spinner.show();
    this.studentService.readMessage(e.target.id).subscribe(() => {
      this.getMessages();
    });
  }

  public markUnread(e)
  {
    this.spinner.show();
    this.studentService.unreadMessage(e.target.id).subscribe(() => {
      this.getMessages();
    });
  }
}
