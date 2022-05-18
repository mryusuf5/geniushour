import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }
  public url: string = "http://yusufyildiz.nl/genieshour/backend/www/";

  public getAllStudents()
  {
    return this.http.get(`${this.url}StudentController/GetAllStudents`);
  }
  public getAllStudentsAsc()
  {
    return this.http.get(`${this.url}StudentController/GetAllStudentsAsc`);
  }
  public getAllStudentsNameAsc()
  {
    return this.http.get(`${this.url}StudentController/GetAllStudentsNameAsc`);
  }
  public getAllStudentsNameDesc()
  {
    return this.http.get(`${this.url}StudentController/GetAllStudentsNameDesc`);
  }
  public getAllStudentsEmailAsc()
  {
    return this.http.get(`${this.url}StudentController/GetAllStudentsEmailAsc`);
  }
  public getAllStudentsEmailDesc()
  {
    return this.http.get(`${this.url}StudentController/GetAllStudentsEmailDesc`);
  }
  public getAllStudentsHoursAsc()
  {
    return this.http.get(`${this.url}StudentController/GetAllStudentsHoursAsc`);
  }
  public getAllStudentsHoursDesc()
  {
    return this.http.get(`${this.url}StudentController/GetAllStudentsHoursDesc`);
  }
  public getAllStudentsNumberAsc()
  {
    return this.http.get(`${this.url}StudentController/GetAllStudentsNumberAsc`);
  }
  public getAllStudentsNumberDesc()
  {
    return this.http.get(`${this.url}StudentController/GetAllStudentsNumberDesc`);
  }

  public getSingleStudent(data)
  {
    return this.http.post(`${this.url}StudentController/GetSingleStudent`, data);
  }

  public getAllClasses()
  {
    return this.http.get(`${this.url}StudentController/GetAllClasses`);
  }

  public editStudent(data)
  {
    return this.http.post(`${this.url}StudentController/EditStudent`, data);
  }

  public deleteStudent(data)
  {
    return this.http.post(`${this.url}StudentController/DeleteStudent`, data);
  }

  public addStudent(data)
  {
    return this.http.post(`${this.url}StudentController/AddStudent`, data);
  }

}
