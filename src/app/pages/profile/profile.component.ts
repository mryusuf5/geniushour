import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public student: any = [];
  public teacher: any = [];
  public selectedFile: any;
  public userId: string;
  public teacherId: string;
  public profileForm: FormGroup;
  public messages: any;
  public currentPass: string = "";
  public newPass: string = "";
  public repeatNewPass: string = "";
  public passwordData: any = [];
  public teacherMail: string;
  public userMail: string;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if(localStorage.getItem("userdata"))
    {
      this.student = JSON.parse(localStorage.getItem("userdata"));
      this.userId = this.student[0].student_id;
      this.userMail = this.student[0].student_email;
    }
    else if(localStorage.getItem("teacher"))
    {
      this.teacher = JSON.parse(localStorage.getItem("teacher"));
      this.teacherId = this.teacher[0].teacher_id;
      this.teacherMail = this.teacher[0].teacher_email;
    }

    this.profileForm = this.formBuilder.group({
      profilePicture: [null],
      userId: [""]
    })
  }

  onFileChange(e)
  {
    this.selectedFile = e.target.files[0];
    this.profileForm.patchValue({
      profilePicture: this.selectedFile,
      userId: this.userId,
      teacherId: this.teacherId
    })
  }

  public changeProfilePicture()
  {
    if(this.selectedFile)
    {
      this.spinner.show();
      const data = new FormData();
      data.append("profilePicture", this.profileForm.value.profilePicture)
      data.append("userId", this.userId);

      this.userService.changeProfilePicture(data).subscribe((e) => {
        this.messages = e;
        this.spinner.hide();
        this.userService.getProfilePicture(this.userId).subscribe((e) => {
          this.student[0].student_image = e[0].student_image;
          localStorage.setItem("userdata", JSON.stringify(this.student));
          window.location.reload();
        })
      })
    }
    else
    {
      this.messages = {"error": "Selecteer een foto a.u.b."};
    }

  }

  public changeProfilePictureTeacher()
  {
    if(this.selectedFile)
    {
      this.spinner.show();
      const data = new FormData();
      data.append("profilePicture", this.profileForm.value.profilePicture)
      data.append("teacherId", this.teacherId);

      this.userService.changeProfilePictureTeacher(data).subscribe((e) => {
        this.messages = e;
        this.spinner.hide();
        this.userService.getProfilePictureTeacher(this.teacherId).subscribe((e) => {
          this.teacher[0].teacher_image = e[0].teacher_image;
          localStorage.setItem("teacher", JSON.stringify(this.teacher));
          window.location.reload();
        })
      })
    }
    else
    {
      this.messages = {"error": "Selecteer een foto a.u.b."};
    }
  }

  public updatePassword()
  {
    if(this.currentPass.length == 0 || this.newPass.length == 0 || this.repeatNewPass.length == 0)
    {
      this.messages = {error: "Vul alles in a.u.b."};
    }
    else
    {
      if(localStorage.getItem("userdata"))
      {
        this.passwordData.push("student", this.newPass, this.userMail, this.currentPass);
      }
      else if(localStorage.getItem("teacher"))
      {
        this.passwordData.push("teacher", this.newPass, this.teacherMail, this.currentPass);
      }
      if(this.newPass === this.repeatNewPass)
      {
        this.userService.UpdateUserPassword(this.passwordData).subscribe((e) => {
          this.messages = e;
        })
      }
      else
      {
        this.messages = {error: "Herhaalde wachtwoord komt niet overeen met uw nieuwe wacthwoord."};
      }
    }
    this.passwordData = [];
  }

}
