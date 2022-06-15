import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string = "http://yusufyildiz.nl/genieshour/backend/www/";
  constructor(private http: HttpClient) { }

  public loggedIn()
  {
    return !!localStorage.getItem("userdata");
  }

  public login(data)
  {
    return this.http.post(`${this.url}UserController/LoginStudent`, data);
  }

  public loginTeacher(data)
  {
    return this.http.post(`${this.url}UserController/LoginTeacher`, data);
  }

  public changeProfilePicture(data)
  {
    return this.http.post(`${this.url}UserController/ChangeProfilePicture`, data);
  }

  public changeProfilePictureTeacher(data)
  {
    return this.http.post(`${this.url}UserController/ChangeProfilePictureTeacher`, data);
  }

  public getProfilePicture(data)
  {
    return this.http.post(`${this.url}UserController/GetProfileImage`, data);
  }

  public getProfilePictureTeacher(data)
  {
    return this.http.post(`${this.url}UserController/GetProfileImageTeacher`, data);
  }

  public UpdateUserPassword(data)
  {
    return this.http.post(`${this.url}UserController/UpdateUserPassword`, data);
  }
}
