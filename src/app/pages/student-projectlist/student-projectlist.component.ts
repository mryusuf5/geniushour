import { Component, OnInit } from '@angular/core';
import { StudentService } from "../../services/student.service";
import { ProjectService } from "../../services/project.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-student-projectlist',
  templateUrl: './student-projectlist.component.html',
  styleUrls: ['./student-projectlist.component.scss']
})
export class StudentProjectlistComponent implements OnInit {

  public student:any = [];
  public classes: any = [];
  public messages: any;
  public formStudentFirstName: string;
  public formStudentLastName: string;
  public formStudentEmail: string;
  public formStudentPrefix: string;
  public formStudentHours: string;
  public formStudentClass: string;
  public projects: any = [];
  public selectedSearch: string = "Project naam";
  public searchName: string;
  public page: number = 1;
  public projectsNumber: boolean = true;
  public projectsName: boolean = false;
  public projectsField: boolean = false;
  public projectsDuration: boolean = false;
  public projectsDifficulity: boolean = false;
  public menuShow: boolean = false;

  public studentId: any;

  constructor(private studentService: StudentService,
    private spinner: NgxSpinnerService,
              private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((e) => {
      this.studentId = e["studentId"];
    });

    this.studentService.getAllClasses().subscribe((e) => {
      this.classes = e;
    })

    this.studentService.getSingleStudent(this.studentId).subscribe((e) => {
      this.student = e;
      this.formStudentFirstName = this.student[0].student_firstname;
      this.formStudentLastName = this.student[0].student_lastname;
      this.formStudentEmail = this.student[0].student_email;
      this.formStudentPrefix = this.student[0].student_prefix;
      this.formStudentHours = this.student[0].student_hours;
      this.formStudentClass = this.student[0].class_id;
    })

    this.getStudentProjects();
  }

  public getStudentProjects()
  {
    const data = this.studentId;
    this.projectService.getAllStudentProjects(data).subscribe((e) => {
      this.projects = e;
    })
  }

  public gotoStudentProject(e)
  {
    this.router.navigate(["/studenten/studentproject"], {queryParams: {studentId: this.studentId, "projectId": e.srcElement.id}});
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
      this.getStudentProjects();
    }
  }

  public gotoProject(e)
  {
    this.router.navigate(["/projecten/project-edit"], {queryParams: {projectId: e.srcElement.id}});
  }

  public gotoStudent(e)
  {
    this.router.navigate(["/studenten/student-edit"], {queryParams: {studentId: e.srcElement.id}});
  }
}
