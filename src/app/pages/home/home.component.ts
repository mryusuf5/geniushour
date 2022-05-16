import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProjectService} from "../../services/project.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user: any;
  public allProjects: boolean = false;
  public myProjects: boolean = false;
  public projects: any = [];
  public userdata: any = JSON.parse(localStorage.getItem("userdata"));
  public userdataClassId: string = this.userdata[0].class_id;
  public projectsCount: number;
  public teachers:any = [];
  public projectsNumber: boolean = true;
  public projectsName: boolean = false;
  public projectsField: boolean = false;
  public projectsDuration: boolean = false;
  public projectsDifficulity: boolean = false;
  public searchName: string;
  public selectedSearch: string = "Project naam";
  public key: string = "project_id";
  public reverse: boolean = false;
  public page: number = 1;

  constructor(private router: Router,
              private projectService: ProjectService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if(this.router.url.includes("totaal-projecten"))
    {
      this.allProjects = true;
      this.getAllProjectsYear();
    }
    if(this.router.url.includes("mijn-projecten"))
    {
      this.myProjects = true;
    }
    const data = {"classId": this.userdataClassId};
    this.projectService.GetAllProjectsByYearDesc(data).subscribe((e) => {
      this.projects = e;
      this.projectsCount = this.projects.length;
    })
  }

  public search()
  {
    if(this.selectedSearch == "Project naam" && this.searchName != "")
    {
      this.projects = this.projects.filter(res => {
        return res.project_name.toLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
    else if(this.selectedSearch == "Vak" && this.searchName != "")
    {
      this.projects = this.projects.filter(res => {
        return res.field_name.toLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
    else if(this.selectedSearch == "Aantal uren" && this.searchName != "")
    {
      this.projects = this.projects.filter(res => {
        return res.project_duration.toLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
    else if(this.selectedSearch == "Moeilijkheidsgraad" && this.searchName != "")
    {
      this.projects = this.projects.filter(res => {
        return res.project_difficulty.toLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
    else if(this.searchName == "")
    {
      this.getAllProjectsYear();
    }
  }

  public sort(key)
  {
    this.key = key;
    this.reverse = !this.reverse;
  }

  public getAllProjectsYear()
  {
    this.spinner.show();
    const data = {"classId": this.userdataClassId};
    this.projectService.GetAllProjectsByYearDesc(data).subscribe((e) => {
      this.projects = e;
      this.projectsCount = this.projects.length;
      this.spinner.hide();
      this.getTeachersForSingleProjects();
      console.log(this.projects);
    },(err) => {
      this.spinner.hide();
      console.log(err);
    })
  }
  public getAllProjectsNumber()
  {
    const data = {"classId": this.userdataClassId};

    if(this.projectsNumber)
    {
      this.spinner.show();
      this.projectService.GetAllProjectsByYearAsc(data).subscribe((e) => {
        this.projects = e;
        this.spinner.hide();
        this.projectsNumber = false;
      })
    }
    else if(!this.projectsNumber)
    {
      this.spinner.show();
      this.projectService.GetAllProjectsByYearDesc(data).subscribe((e) => {
        this.projects = e;
        this.spinner.hide();
        this.projectsNumber = true;
      })
    }
  }
  public getAllProjectsName()
  {
    const data = {"classId": this.userdataClassId};
    if(!this.projectsName)
    {
      this.projectService.GetAllProjectsYearByNameAsc(data).subscribe((e) => {
        this.projects = e;
        this.spinner.hide();
        this.projectsName = true;
      })
    }
    else if(this.projectsName)
    {
      this.projectService.GetAllProjectsYearByNameDesc(data).subscribe((e) => {
        this.projects = e;
        this.spinner.hide();
        this.projectsName = false;
      })
    }
  }
  public getAllProjectsField()
  {
    const data = {"classId": this.userdataClassId};
    if(!this.projectsField)
    {
      this.projectService.GetAllProjectsYearByFieldAsc(data).subscribe((e) => {
        this.projects = e;
        this.spinner.hide();
        this.projectsField = true;
      })
    }
    else if(this.projectsField)
    {
      this.projectService.GetAllProjectsYearByFieldDesc(data).subscribe((e) => {
        this.projects = e;
        this.spinner.hide();
        this.projectsField = false;
      })
    }
  }
  public getAllProjectsHours()
  {
    const data = {"classId": this.userdataClassId};
    if(!this.projectsDuration)
    {
      this.projectService.GetAllProjectsYearByDurationAsc(data).subscribe((e) => {
        this.projects = e;
        this.spinner.hide();
        this.projectsDuration = true;
      })
    }
    else if(this.projectsDuration)
    {
      this.projectService.GetAllProjectsYearByDurationDesc(data).subscribe((e) => {
        this.projects = e;
        this.spinner.hide();
        this.projectsDuration = false;
      })
    }
  }
  public getAllProjectsDifficulity()
  {
    const data = {"classId": this.userdataClassId};
    if(!this.projectsDifficulity)
    {
      this.projectService.GetAllProjectsYearByDifficulityAsc(data).subscribe((e) => {
        this.projects = e;
        this.spinner.hide();
        this.projectsDifficulity = true;
      })
    }
    else if(this.projectsDifficulity)
    {
      this.projectService.GetAllProjectsYearByDifficulityDesc(data).subscribe((e) => {
        this.projects = e;
        this.spinner.hide();
        this.projectsDifficulity = false;
      })
    }
  }

  public getTeachersForSingleProjects()
  {
    for (let i = 0; i < this.projects.length; i++)
    {
      let data = {"projectId": this.projects[i].project_id};
      this.projectService.GetTeachersForSingleProject(data).subscribe((data) => {
        this.teachers.push(data);
        let teachers = {"teachers": this.teachers};
        Object.assign(this.projects[i], teachers);
        this.teachers = [];
      })

      console.log(this.projects);
    }
  }

  public gotoProject(e)
  {
    this.router.navigate(["/home/project"], {queryParams: {projectId: e.srcElement.id}});
  }
}
