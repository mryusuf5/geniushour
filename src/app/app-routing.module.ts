import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {HomeComponent} from "./pages/home/home.component";
import {AuthService} from "./services/auth.service";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {ProjectsComponent} from "./pages/projects/projects.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {SingleProjectComponent} from "./pages/single-project/single-project.component";
import {StudentsComponent} from "./pages/students/students.component";
import {SingleProjectEditComponent} from "./pages/single-project-edit/single-project-edit.component";
import {SingleStudentComponent} from "./pages/single-student/single-student.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {TeachersComponent} from "./pages/teachers/teachers.component";
import {SingleTeacherComponent} from "./pages/single-teacher/single-teacher.component";
import {ApplicationsComponent} from "./pages/applications/applications.component";
import {MessagesComponent} from "./pages/messages/messages.component";

const routes: Routes = [
  {path: "", component: LoginComponent, canActivate: [AuthService]},
  {path: "login", component: LoginComponent, canActivate: [AuthService]},
  {path: "home", component: HomeComponent, canActivate: [AuthService]},
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthService]},
  {path: "projecten", component: ProjectsComponent, canActivate: [AuthService]},
  {path: "studenten", component: StudentsComponent, canActivate: [AuthService]},
  {path: "instellingen", component: SettingsComponent, canActivate: [AuthService]},
  {path: "home/totaal-projecten", component: HomeComponent, canActivate: [AuthService]},
  {path: "home/mijn-projecten", component: HomeComponent, canActivate: [AuthService]},
  {path: "home/project", component: SingleProjectComponent, canActivate: [AuthService]},
  {path: "projecten/project-edit", component: SingleProjectEditComponent, canActivate: [AuthService]},
  {path: "studenten/student-edit", component: SingleStudentComponent, canActivate: [AuthService]},
  {path: "leraren/leraar-edit", component: SingleTeacherComponent, canActivate: [AuthService]},
  {path: "profiel", component: ProfileComponent, canActivate: [AuthService]},
  {path: "leraren", component: TeachersComponent, canActivate: [AuthService]},
  {path: "verzoeken", component: ApplicationsComponent, canActivate: [AuthService]},
  {path: "berichten", component: MessagesComponent, canActivate: [AuthService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
