import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public url: string = "http://yusufyildiz.nl/genieshour/backend/www/";
  constructor(private http: HttpClient) { }

  public GetAllProjects()
  {
    return this.http.get(`${this.url}ProjectController/GetAllProjects`);
  }
  public GetAllProjectsByYearAsc(data)
  {
    return this.http.post(`${this.url}ProjectController/GetAllProjectsByYearAsc`, data);
  }
  public GetAllProjectsByYearDesc(data)
  {
    return this.http.post(`${this.url}ProjectController/GetAllProjectsByYearDesc`, data);
  }
  public GetAllProjectsYearByNameAsc(data)
  {
    return this.http.post(`${this.url}ProjectController/GetAllProjectsYearByNameAsc`, data);
  }
  public GetAllProjectsYearByNameDesc(data)
  {
    return this.http.post(`${this.url}ProjectController/GetAllProjectsYearByNameDesc`, data);
  }
  public GetAllProjectsYearByFieldAsc(data)
  {
    return this.http.post(`${this.url}ProjectController/GetAllProjectsYearByFieldAsc`, data);
  }
  public GetAllProjectsYearByFieldDesc(data)
  {
    return this.http.post(`${this.url}ProjectController/GetAllProjectsYearByFieldDesc`, data);
  }
  public GetAllProjectsYearByDurationAsc(data)
  {
    return this.http.post(`${this.url}ProjectController/GetAllProjectsYearByDurationAsc`, data);
  }
  public GetAllProjectsYearByDurationDesc(data)
  {
    return this.http.post(`${this.url}ProjectController/GetAllProjectsYearByDurationDesc`, data);
  }
  public GetAllProjectsYearByDifficulityAsc(data)
  {
    return this.http.post(`${this.url}ProjectController/GetAllProjectsYearByDifficulityAsc`, data);
  }
  public GetAllProjectsYearByDifficulityDesc(data)
  {
    return this.http.post(`${this.url}ProjectController/GetAllProjectsYearByDifficulityDesc`, data);
  }
  public GetAllProjectsAsc()
  {
    return this.http.get(`${this.url}ProjectController/GetAllProjectsAsc`);
  }
  public GetAllProjectsDesc()
  {
    return this.http.get(`${this.url}ProjectController/GetAllProjectsDesc`);
  }
  public GetAllProjectsByNameAsc()
  {
    return this.http.get(`${this.url}ProjectController/GetAllProjectsByNameAsc`);
  }
  public GetAllProjectsByNameDesc()
  {
    return this.http.get(`${this.url}ProjectController/GetAllProjectsByNameDesc`);
  }
  public GetAllProjectsByFieldAsc()
  {
    return this.http.get(`${this.url}ProjectController/GetAllProjectsByFieldAsc`);
  }
  public GetAllProjectsByFieldDesc()
  {
    return this.http.get(`${this.url}ProjectController/GetAllProjectsByFieldDesc`);
  }
  public GetAllProjectsByDurationAsc()
  {
    return this.http.get(`${this.url}ProjectController/GetAllProjectsByDurationAsc`);
  }
  public GetAllProjectsByDurationDesc()
  {
    return this.http.get(`${this.url}ProjectController/GetAllProjectsByDurationDesc`);
  }
  public GetAllProjectsByDifficulityAsc()
  {
    return this.http.get(`${this.url}ProjectController/GetAllProjectsByDifficulityAsc`);
  }
  public GetAllProjectsByDifficulityDesc()
  {
    return this.http.get(`${this.url}ProjectController/GetAllProjectsByDifficulityDesc`);
  }
  public GetSingleProject(data)
  {
    return this.http.post(`${this.url}ProjectController/GetSingleProject`, data);
  }

  public GetAllFields()
  {
    return this.http.get(`${this.url}ProjectController/GetAllFields`);
  }

  public GetAllFieldsById(data)
  {
    return this.http.post(`${this.url}ProjectController/GetAllFieldsById`, data);
  }

  public GetTeachersForSingleProject(data)
  {
    return this.http.post(`${this.url}ProjectController/GetTeachersForSingleProject`, data);
  }

  public AddNewProject(data)
  {
    return this.http.post(`${this.url}ProjectController/AddNewProject`, data);
  }

  public EditProject(data)
  {
    return this.http.post(`${this.url}ProjectController/EditProject`, data);
  }

  public deleteProject(data)
  {
    return this.http.post(`${this.url}ProjectController/DeleteProject`, data);
  }

  public getApplicationById(data)
  {
    return this.http.post(`${this.url}ProjectController/GetApplicationById`, data);
  }

  public getApplicationsByField(data)
  {
    return this.http.post(`${this.url}ProjectController/GetApplicationByField`, data);
  }

  public AddApplication(data)
  {
    return this.http.post(`${this.url}ProjectController/AddApplication`, data);
  }

  public getStudentProjects(data)
  {
    return this.http.post(`${this.url}ProjectController/GetStudentProjects`, data);
  }

  public getStudentProject(data)
  {
    return this.http.post(`${this.url}ProjectController/GetStudentProject`, data);
  }

  public getApplicationsByStudentId(data)
  {
    return this.http.post(`${this.url}ProjectController/getApplicationsByStudentId`, data);
  }

  public denyApplication(data)
  {
    return this.http.post(`${this.url}ProjectController/DenyApplication`, data);
  }

  public acceptApplication(data)
  {
    return this.http.post(`${this.url}ProjectController/AcceptApplication`, data);
  }

  public getMessagesSingleProject(data)
  {
    return this.http.post(`${this.url}ProjectController/GetMessagesSingleProject`, data);
  }
}
