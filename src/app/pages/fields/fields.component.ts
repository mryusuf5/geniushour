import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../services/project.service";
import { NgxSpinnerService} from "ngx-spinner";
import Swal from "sweetalert2";

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent implements OnInit {

  public showModal: boolean = false;
  public fields: any = [];
  public page: number = 1;
  public error: string;
  public fieldName: string;
  public messages: any;
  constructor(private projectService: ProjectService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllFields();
  }

  public triggerModal()
  {
    this.showModal = true;
  }

  public addNewField()
  {
    const data = this.fieldName;
    this.spinner.show();
    this.projectService.addField(data).subscribe((e) => {
      this.messages = e;
      this.spinner.hide();
      if(this.messages.success)
      {
        this.showModal = false;
        this.getAllFields();
      }
    })
  }

  public getAllFields()
  {
    this.spinner.show();
    this.projectService.GetAllFields().subscribe((e) => {
      this.fields = e;
      this.spinner.hide();
    })
  }

  public deleteField(e)
  {
    const data = e.target.id;
    Swal.fire({
      title: "Weet u zeker dat u deze vak wilt verwijderen?",
      text: "Alle projecten gekoppeld met deze vak worden ook verwijderd.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Nee",
      confirmButtonText: "Ja",
      confirmButtonColor: "#169898",
      cancelButtonColor: "#BB2D3B",
    }).then((e) => {
      if(e.isConfirmed)
      {
        this.projectService.deleteField(data).subscribe(() => {
          Swal.fire(
            "Vak is verwijderd.",
            " ",
            "success"
          )
          this.getAllFields();
        })
      }
    })
  }
}
