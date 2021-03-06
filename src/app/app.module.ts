import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/templates/header/header.component';
import { FooterComponent } from './pages/templates/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { NgxSpinnerModule} from "ngx-spinner";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './pages/templates/sidebar/sidebar.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { SingleProjectComponent } from './pages/single-project/single-project.component';
import { SidebarTeacherComponent } from './pages/templates/sidebar-teacher/sidebar-teacher.component';
import { StudentsComponent } from './pages/students/students.component';
import { NgxPaginationModule} from "ngx-pagination";
import { Ng2OrderModule} from "ng2-order-pipe";
import { Ng2SearchPipeModule} from "ng2-search-filter";
import { SingleProjectEditComponent } from './pages/single-project-edit/single-project-edit.component';
import { SingleStudentComponent } from './pages/single-student/single-student.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { SingleTeacherComponent } from './pages/single-teacher/single-teacher.component';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { SingleStudentProjectComponent } from './pages/single-student-project/single-student-project.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { SingleStudentProjectTeacherComponent } from './pages/single-student-project-teacher/single-student-project-teacher.component';
import { StudentProjectlistComponent} from "./pages/student-projectlist/student-projectlist.component";
import { ClassesComponent } from './pages/classes/classes.component';
import { SingleClassComponent } from './pages/single-class/single-class.component';
import { FieldsComponent } from './pages/fields/fields.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    SidebarComponent,
    ProjectsComponent,
    SingleProjectComponent,
    SidebarTeacherComponent,
    StudentsComponent,
    SingleProjectEditComponent,
    SingleStudentComponent,
    ProfileComponent,
    TeachersComponent,
    SingleTeacherComponent,
    ApplicationsComponent,
    SingleStudentProjectComponent,
    MessagesComponent,
    SingleStudentProjectTeacherComponent,
    StudentProjectlistComponent,
    ClassesComponent,
    SingleClassComponent,
    FieldsComponent,
    PasswordResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
