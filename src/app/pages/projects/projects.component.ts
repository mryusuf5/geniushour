import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../services/project.service";
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent implements OnInit {

  public projects: any = [];
  public projectsCount: number;
  public showModal: boolean;
  public fields: any = [];
  public projectForm: FormGroup;
  public messages: any;
  public error: string;
  public projectsNumber: boolean = true;
  public projectsName: boolean = false;
  public projectsField: boolean = false;
  public projectsDuration: boolean = false;
  public projectsDifficulity: boolean = false;
  public searchName: string;
  public selectedSearch: string = "Project naam";
  public reverse: boolean = false;
  public page: number = 1;


  constructor(private projectService: ProjectService,
              private spinner: NgxSpinnerService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllProjects();
    this.projectForm = this.formBuilder.group({
      projectName: [""],
      projectDescription: [""],
      projectDuration: [""],
      projectField: [""],
      projectDifficulity: [""],
      projectYear: [""]
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
      this.getAllProjects();
    }
  }

  public gotoProject(e)
  {
    this.router.navigate(["/projecten/project-edit"], {queryParams: {projectId: e.srcElement.id}});
  }

  public getAllProjects()
  {
    this.spinner.show();
    this.projectService.GetAllProjects().subscribe((e) => {
      this.projects = e;
      this.projectsCount = this.projects.length;
      this.spinner.hide();
      console.log(this.projects);
    },(err) => {
      this.spinner.hide();
      console.log(err);
    })
  }

  public triggerModal()
  {
    this.showModal = true;
    this.projectService.GetAllFields().subscribe((e) => {
      this.fields = e;
    })
  }

  public addNewProject()
  {

    const data = [];

    data.push(this.projectForm.value.projectName,
      this.projectForm.value.projectDescription,
      this.projectForm.value.projectDuration,
      this.projectForm.value.projectField,
      this.projectForm.value.projectDifficulity,
      this.projectForm.value.projectYear)

    this.projectService.AddNewProject(data).subscribe((e) => {
      this.messages = e;
      if(this.messages.message)
      {
        this.error = this.messages.message;
      }
      if(this.messages.success)
      {
        this.showModal = false;
        this.getAllProjects();
        this.projectForm.get("projectName").reset(),
        this.projectForm.get("projectDescription").reset(),
        this.projectForm.get("projectDuration").reset(),
        this.projectForm.value.get("projectField").reset(),
        this.projectForm.value.get("projectDifficulity").reset(),
        this.projectForm.value.get("projectYear").reset()
      }

    })
  }

  public getAllProjectsNumber()
  {
    if(this.projectsNumber)
    {
      this.spinner.show();
      this.projectService.GetAllProjectsAsc().subscribe((e) => {
        this.projects = e;
        this.spinner.hide();
        this.projectsNumber = false;
      })
    }
    else if(!this.projectsNumber)
    {
      this.spinner.show();
      this.projectService.GetAllProjectsDesc().subscribe((e) => {
        this.projects = e;
        this.spinner.hide();
        this.projectsNumber = true;
      })
    }
  }
  public getAllProjectsName()
  {
    if(!this.projectsName)
    {
      this.projectService.GetAllProjectsByNameAsc().subscribe((e) => {
        this.projects = e;
        this.spinner.hide();
        this.projectsName = true;
      })
    }
    else if(this.projectsName)
    {
      this.projectService.GetAllProjectsByNameDesc().subscribe((e) => {
        this.projects = e;
        this.spinner.hide();
        this.projectsName = false;
      })
    }
  }
  public getAllProjectsField()
  {
    if(!this.projectsField)
    {
      this.projectService.GetAllProjectsByFieldAsc().subscribe((e) => {
        this.projects = e;
        this.spinner.hide();
        this.projectsField = true;
      })
    }
    else if(this.projectsField)
    {
      this.projectService.GetAllProjectsByFieldDesc().subscribe((e) => {
        this.projects = e;
        this.spinner.hide();
        this.projectsField = false;
      })
    }
  }
  public getAllProjectsHours()
  {
    if(!this.projectsDuration)
    {
      this.projectService.GetAllProjectsByDurationAsc().subscribe((e) => {
        this.projects = e;
        this.spinner.hide();
        this.projectsDuration = true;
      })
    }
    else if(this.projectsDuration)
    {
      this.projectService.GetAllProjectsByDurationDesc().subscribe((e) => {
        this.projects = e;
        this.spinner.hide();
        this.projectsDuration = false;
      })
    }
  }
  public getAllProjectsDifficulity()
  {
    if(!this.projectsDifficulity)
    {
      this.projectService.GetAllProjectsByDifficulityAsc().subscribe((e) => {
        this.projects = e;
        this.spinner.hide();
        this.projectsDifficulity = true;
      })
    }
    else if(this.projectsDifficulity)
    {
      this.projectService.GetAllProjectsByDifficulityDesc().subscribe((e) => {
        this.projects = e;
        this.spinner.hide();
        this.projectsDifficulity = false;
      })
    }
  }
}
