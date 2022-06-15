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

  public getMessagesStudent(data)
  {
    return this.http.post(`${this.url}StudentController/GetMessagesStudent`, data);
  }

  public readMessage(data)
  {
    return this.http.post(`${this.url}StudentController/ReadMessage`, data);
  }

  public unreadMessage(data)
  {
    return this.http.post(`${this.url}StudentController/UnreadMessage`, data);
  }

  public deleteMessage(data)
  {
    return this.http.post(`${this.url}StudentController/DeleteMessage`, data);
  }

  public getAllClassesIdAsc()
  {
    return this.http.get(`${this.url}StudentController/GetAllClassesIdAsc`);
  }
  public getAllClassesIdDesc()
  {
    return this.http.get(`${this.url}StudentController/GetAllClassesIdDesc`);
  }
  public getAllClassesNameDesc()
  {
    return this.http.get(`${this.url}StudentController/GetAllClassesNameDesc`);
  }
  public getAllClassesNameAsc()
  {
    return this.http.get(`${this.url}StudentController/GetAllClassesNameAsc`);
  }
  public getAllClassesYearAsc()
  {
    return this.http.get(`${this.url}StudentController/GetAllClassesYearAsc`);
  }
  public getAllClassesYearDesc()
  {
    return this.http.get(`${this.url}StudentController/GetAllClassesYearDesc`);
  }

  public addClass(data)
  {
    return this.http.post(`${this.url}StudentController/AddClass`, data);
  }

  public deleteClass(data)
  {
    return this.http.post(`${this.url}StudentController/DeleteClass`, data);
  }

  public getStudentsClass(data)
  {
    return this.http.post(`${this.url}StudentController/GetStudentsClass`, data);
  }

  public deleteFromClass(data)
  {
    return this.http.post(`${this.url}StudentController/DeleteFromClass`, data);
  }

  public getSingleClass(data)
  {
    return this.http.post(`${this.url}StudentController/GetSingleClass`, data);
  }

  public setStudentClass(data)
  {
    return this.http.post(`${this.url}StudentController/SetStudentClass`, data);
  }
}
