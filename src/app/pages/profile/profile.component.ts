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

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if(localStorage.getItem("userdata"))
    {
      this.student = JSON.parse(localStorage.getItem("userdata"));
      this.userId = this.student[0].student_id;
    }
    else if(localStorage.getItem("teacher"))
    {
      this.teacher = JSON.parse(localStorage.getItem("teacher"));
      this.teacherId = this.teacher[0].teacher_id;
    }

    this.profileForm = this.formBuilder.group({
      profilePicture: [null],
      userId: [""]
    })
  }

  onFileChange(e)
  {
    this.selectedFile = e.srcElement.files[0];
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

}
