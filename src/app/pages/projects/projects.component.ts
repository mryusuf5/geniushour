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
  public selectedSearch: string = "project naam";
  public reverse: boolean = false;
  public page: number = 1;
  public selectedFiles: any = [];
  public files: any;

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
      projectYear: [""],
      files: [null]
    })
  }

  public search()
  {
    if(this.selectedSearch == "project naam" && this.searchName != "")
    {
      this.projects = this.projects.filter(res => {
        return res.project_name.toLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
    else if(this.selectedSearch == "vak" && this.searchName != "")
    {
      this.projects = this.projects.filter(res => {
        return res.field_name.toLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
    else if(this.selectedSearch == "aantal uren" && this.searchName != "")
    {
      this.projects = this.projects.filter(res => {
        return res.project_duration.toLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
    else if(this.selectedSearch == "moeilijkheidsgraad" && this.searchName != "")
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
    this.router.navigate(["/projecten/project-edit"], {queryParams: {projectId: e.target.id}});
  }

  public getAllProjects()
  {
    this.spinner.show();
    this.projectService.GetAllProjects().subscribe((e) => {
      this.projects = e;
      this.projectsCount = this.projects.length;
      this.spinner.hide();
    })
  }

  public triggerModal()
  {
    this.showModal = true;
    this.projectService.GetAllFields().subscribe((e) => {
      this.fields = e;
    })
  }

  public uploadFile(e)
  {
    this.selectedFiles = e.target.files;
    this.projectForm.patchValue({
      files: this.selectedFiles
    })
  }

  public removeFiles()
  {
    this.selectedFiles = [];
    this.files = [];
    this.projectForm.patchValue({
      files: []
    })
    console.log(this.selectedFiles)
  }

  public addNewProject()
  {
    this.spinner.show();
    const files = new FormData();

    for(let i = 0; i < this.selectedFiles.length; i++)
    {
      files.append("files[]", this.projectForm.value.files[i]);
    }
    files.append("projectName", this.projectForm.value.projectName);
    files.append("projectDescription", this.projectForm.value.projectDescription);
    files.append("projectDuration", this.projectForm.value.projectDuration);
    files.append("projectField", this.projectForm.value.projectField);
    files.append("projectDifficulity", this.projectForm.value.projectDifficulity);


    this.projectService.AddNewProject(files).subscribe((e) => {
      this.messages = e;
      console.log(this.messages);
      if(this.messages.error)
      {
        this.spinner.hide();
        this.error = this.messages.error;
      }
      if(this.messages.success)
      {
        this.spinner.hide();
        this.showModal = false;
        this.getAllProjects();
        location.reload();
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
        this.projectsNumber = false;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
    }
    else if(!this.projectsNumber)
    {
      this.spinner.show();
      this.projectService.GetAllProjectsDesc().subscribe((e) => {
        this.projects = e;
        this.projectsNumber = true;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
    }
  }
  public getAllProjectsName()
  {
    if(!this.projectsName)
    {
      this.projectService.GetAllProjectsByNameAsc().subscribe((e) => {
        this.projects = e;
        this.projectsName = true;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
    }
    else if(this.projectsName)
    {
      this.projectService.GetAllProjectsByNameDesc().subscribe((e) => {
        this.projects = e;
        this.projectsName = false;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
    }
  }
  public getAllProjectsField()
  {
    if(!this.projectsField)
    {
      this.projectService.GetAllProjectsByFieldAsc().subscribe((e) => {
        this.projects = e;
        this.projectsField = true;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
    }
    else if(this.projectsField)
    {
      this.projectService.GetAllProjectsByFieldDesc().subscribe((e) => {
        this.projects = e;
        this.projectsField = false;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
    }
  }
  public getAllProjectsHours()
  {
    if(!this.projectsDuration)
    {
      this.projectService.GetAllProjectsByDurationAsc().subscribe((e) => {
        this.projects = e;
        this.projectsDuration = true;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
    }
    else if(this.projectsDuration)
    {
      this.projectService.GetAllProjectsByDurationDesc().subscribe((e) => {
        this.projects = e;
        this.projectsDuration = false;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
    }
  }
  public getAllProjectsDifficulity()
  {
    if(!this.projectsDifficulity)
    {
      this.projectService.GetAllProjectsByDifficulityAsc().subscribe((e) => {
        this.projects = e;
        this.projectsDifficulity = true;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
    }
    else if(this.projectsDifficulity)
    {
      this.projectService.GetAllProjectsByDifficulityDesc().subscribe((e) => {
        this.projects = e;
        this.projectsDifficulity = false;
        this.spinner.hide();
      },(err) => {
        this.spinner.hide();
      })
    }
  }
}
