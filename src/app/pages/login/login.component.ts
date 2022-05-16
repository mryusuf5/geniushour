import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from "@angular/forms";
import { UserService} from "../../services/user.service";
import { Router} from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public messages: any;
  public user: any;
  public loginForm: FormGroup;
  public studentBool: Boolean = true;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [""],
      password: [""]
    })
  }

  public loginFormSubmit()
  {
    const data = new FormData();
    const userdata = [];
    data.append("username", this.loginForm.value.username);
    data.append("password", this.loginForm.value.password);
    userdata.push(this.loginForm.value.username, this.loginForm.value.password);

    this.spinner.show();
    this.userService.login(userdata).subscribe((data) => {
      this.spinner.hide();
      this.messages = data;
      if(this.messages.user)
      {
        let userdata = this.messages.user;
        localStorage.setItem("userdata", JSON.stringify(userdata));
        this.router.navigate(["/home"]);
      }
    })
  }

  public loginFormSubmitTeacher()
  {
    const data = new FormData();
    const userdata = [];
    data.append("username", this.loginForm.value.username);
    data.append("password", this.loginForm.value.password);
    userdata.push(this.loginForm.value.username, this.loginForm.value.password);

    this.spinner.show();
    this.userService.loginTeacher(userdata).subscribe((data) => {
      this.spinner.hide();
      this.messages = data;
      if(this.messages.teacher)
      {
        let userdata = this.messages.teacher;
        localStorage.setItem("teacher", JSON.stringify(userdata));
        this.router.navigate(["/home"]);
      }
    })
  }

  public changeTeacher()
  {
    this.studentBool ? this.studentBool = false : this.studentBool = true;
  }

}