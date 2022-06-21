import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  public url: string = "https://yusufyildiz.nl/genieshour/backend/www/";

  constructor(private http: HttpClient) { }

  public getAllTeachers()
  {
    return this.http.get(`${this.url}TeacherController/GetAllTeachers`);
  }
  public getAllTeachersAsc()
  {
    return this.http.get(`${this.url}TeacherController/GetAllTeachersAsc`);
  }
  public getAllTeachersNameAsc()
  {
    return this.http.get(`${this.url}TeacherController/GetAllTeachersNameAsc`);
  }
  public getAllTeachersNameDesc()
  {
    return this.http.get(`${this.url}TeacherController/GetAllTeachersNameDesc`);
  }
  public getAllTeachersEmailAsc()
  {
    return this.http.get(`${this.url}TeacherController/GetAllTeachersEmailAsc`);
  }
  public getAllTeachersEmailDesc()
  {
    return this.http.get(`${this.url}TeacherController/GetAllTeachersEmailDesc`);
  }
  public getAllTeachersFieldAsc()
  {
    return this.http.get(`${this.url}TeacherController/GetAllTeachersFieldAsc`);
  }
  public getAllTeachersFieldDesc()
  {
    return this.http.get(`${this.url}TeacherController/GetAllTeachersFieldDesc`);
  }

  public getSingleTeacher(data)
  {
    return this.http.post(`${this.url}TeacherController/GetSingleTeacher`, data);
  }

  public editTeacher(data)
  {
    return this.http.post(`${this.url}TeacherController/EditTeacher`, data);
  }

  public deleteTeacher(data)
  {
    return this.http.post(`${this.url}TeacherController/DeleteTeacher`, data);
  }

  public addTeacher(data)
  {
    return this.http.post(`${this.url}TeacherController/AddTeacher`, data);
  }

  public getCurrentProjects(data)
  {
    return this.http.post(`${this.url}TeacherController/GetCurrentProjects`, data);
  }

  public getCurrentStudentProjects(data)
  {
    return this.http.post(`${this.url}TeacherController/GetCurrentStudentProjects`, data);
  }
}
