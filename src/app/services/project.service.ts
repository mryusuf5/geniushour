import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  public GetAllProjects()
  {
    return this.http.get("http://yusufyildiz.nl/ProjectController/GetAllProjects");
  }
  public GetAllProjectsByYearAsc(data)
  {
    return this.http.post("http://yusufyildiz.nl/ProjectController/GetAllProjectsByYearAsc", data);
  }
  public GetAllProjectsByYearDesc(data)
  {
    return this.http.post("http://yusufyildiz.nl/ProjectController/GetAllProjectsByYearDesc", data);
  }
  public GetAllProjectsYearByNameAsc(data)
  {
    return this.http.post("http://yusufyildiz.nl/ProjectController/GetAllProjectsYearByNameAsc", data);
  }
  public GetAllProjectsYearByNameDesc(data)
  {
    return this.http.post("http://yusufyildiz.nl/ProjectController/GetAllProjectsYearByNameDesc", data);
  }
  public GetAllProjectsYearByFieldAsc(data)
  {
    return this.http.post("http://yusufyildiz.nl/ProjectController/GetAllProjectsYearByFieldAsc", data);
  }
  public GetAllProjectsYearByFieldDesc(data)
  {
    return this.http.post("http://yusufyildiz.nl/ProjectController/GetAllProjectsYearByFieldDesc", data);
  }
  public GetAllProjectsYearByDurationAsc(data)
  {
    return this.http.post("http://yusufyildiz.nl/ProjectController/GetAllProjectsYearByDurationAsc", data);
  }
  public GetAllProjectsYearByDurationDesc(data)
  {
    return this.http.post("http://yusufyildiz.nl/ProjectController/GetAllProjectsYearByDurationDesc", data);
  }
  public GetAllProjectsYearByDifficulityAsc(data)
  {
    return this.http.post("http://yusufyildiz.nl/ProjectController/GetAllProjectsYearByDifficulityAsc", data);
  }
  public GetAllProjectsYearByDifficulityDesc(data)
  {
    return this.http.post("http://yusufyildiz.nl/ProjectController/GetAllProjectsYearByDifficulityDesc", data);
  }
  public GetAllProjectsAsc()
  {
    return this.http.get("http://yusufyildiz.nl/ProjectController/GetAllProjectsAsc");
  }
  public GetAllProjectsDesc()
  {
    return this.http.get("http://yusufyildiz.nl/ProjectController/GetAllProjectsDesc");
  }
  public GetAllProjectsByNameAsc()
  {
    return this.http.get("http://yusufyildiz.nl/ProjectController/GetAllProjectsByNameAsc");
  }
  public GetAllProjectsByNameDesc()
  {
    return this.http.get("http://yusufyildiz.nl/ProjectController/GetAllProjectsByNameDesc");
  }
  public GetAllProjectsByFieldAsc()
  {
    return this.http.get("http://yusufyildiz.nl/ProjectController/GetAllProjectsByFieldAsc");
  }
  public GetAllProjectsByFieldDesc()
  {
    return this.http.get("http://yusufyildiz.nl/ProjectController/GetAllProjectsByFieldDesc");
  }
  public GetAllProjectsByDurationAsc()
  {
    return this.http.get("http://yusufyildiz.nl/ProjectController/GetAllProjectsByDurationAsc");
  }
  public GetAllProjectsByDurationDesc()
  {
    return this.http.get("http://yusufyildiz.nl/ProjectController/GetAllProjectsByDurationDesc");
  }
  public GetAllProjectsByDifficulityAsc()
  {
    return this.http.get("http://yusufyildiz.nl/ProjectController/GetAllProjectsByDifficulityAsc");
  }
  public GetAllProjectsByDifficulityDesc()
  {
    return this.http.get("http://yusufyildiz.nl/ProjectController/GetAllProjectsByDifficulityDesc");
  }
  public GetSingleProject(data)
  {
    return this.http.post("http://yusufyildiz.nl/ProjectController/GetSingleProject", data);
  }

  public GetAllFields()
  {
    return this.http.get("http://yusufyildiz.nl/ProjectController/GetAllFields");
  }

  public GetAllFieldsById(data)
  {
    return this.http.post("http://yusufyildiz.nl/ProjectController/GetAllFieldsById", data);
  }

  public GetTeachersForSingleProject(data)
  {
    return this.http.post("http://yusufyildiz.nl/ProjectController/GetTeachersForSingleProject", data);
  }

  public AddNewProject(data)
  {
    return this.http.post("http://yusufyildiz.nl/ProjectController/AddNewProject", data);
  }

  public EditProject(data)
  {
    return this.http.post("http://yusufyildiz.nl/ProjectController/EditProject", data);
  }

  public deleteProject(data)
  {
    return this.http.post("http://yusufyildiz.nl/ProjectController/DeleteProject", data);
  }
}
