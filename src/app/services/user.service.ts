import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public loggedIn()
  {
    return !!localStorage.getItem("userdata");
  }

  public login(data)
  {
    return this.http.post("http://yusufyildiz.nl/userController/LoginStudent", data);
  }

  public loginTeacher(data)
  {
    return this.http.post("http://yusufyildiz.nl/userController/LoginTeacher", data);
  }
}
