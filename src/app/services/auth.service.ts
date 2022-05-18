import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from "@angular/router";
import {Authentication} from "../core/authentication";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    switch (route.routeConfig.path)
    {
      case "login" || "":
        if(Authentication.isAuthenticated() == "student")
        {
          this.router.navigate(["/home"]);
        }
        else if(Authentication.isAuthenticated() == "teacher")
        {
          this.router.navigate(["/dashboard"]);
        }
        return true;
        break;
      case "home":
        if(Authentication.isAuthenticated() == "none")
        {
          this.router.navigate(["/login"]);
        }

        if(Authentication.isAuthenticated() == "teacher")
        {
          this.router.navigate(["/dashboard"]);
        }
        return true;
        break;
      case "home/totaal-projecten":
        if(Authentication.isAuthenticated() == "none")
        {
          this.router.navigate(["/login"]);
        }

        if(Authentication.isAuthenticated() == "teacher")
        {
          this.router.navigate(["/dashboard"]);
        }
        return true;
        break;
      case "home/mijn-projecten":
        if(Authentication.isAuthenticated() == "none")
        {
          this.router.navigate(["/login"]);
        }

        if(Authentication.isAuthenticated() == "teacher")
        {
          this.router.navigate(["/dashboard"]);
        }
        return true;
        break;
      case "home/project":
        if(Authentication.isAuthenticated() == "none")
        {
          this.router.navigate(["/login"]);
        }

        if(Authentication.isAuthenticated() == "teacher")
        {
          this.router.navigate(["/dashboard"]);
        }
        return true;
        break;
      case "dashboard":
        if(Authentication.isAuthenticated() == "none")
        {
          this.router.navigate(["/login"]);
        }

        if(Authentication.isAuthenticated() == "student")
        {
          this.router.navigate(["/home"]);
        }
        return true;
        break;
      case "projecten":
        if(Authentication.isAuthenticated() == "none")
        {
          this.router.navigate(["/login"]);
        }
        if(Authentication.isAuthenticated() == "student")
        {
          this.router.navigate(["/home"]);
        }
        return true;
        break;
      case "studenten":
        if(Authentication.isAuthenticated() == "none")
        {
          this.router.navigate(["/login"]);
        }
        if(Authentication.isAuthenticated() == "student")
        {
          this.router.navigate(["/home"]);
        }
        return true;
        break;
      case "studenten/student-edit":
        if(Authentication.isAuthenticated() == "none")
        {
          this.router.navigate(["/login"]);
        }
        if(Authentication.isAuthenticated() == "student")
        {
          this.router.navigate(["/home"]);
        }
        return true;
        break;
      case "leraren":
        if(Authentication.isAuthenticated() == "none")
        {
          this.router.navigate(["/login"]);
        }
        if(Authentication.isAuthenticated() == "student")
        {
          this.router.navigate(["/home"]);
        }
        return true;
        break;
      case "leraren/leraar-edit":
        if(Authentication.isAuthenticated() == "none")
        {
          this.router.navigate(["/login"]);
        }
        if(Authentication.isAuthenticated() == "student")
        {
          this.router.navigate(["/home"]);
        }
        return true;
        break;
      case "verzoeken":
        if(Authentication.isAuthenticated() == "none")
        {
          this.router.navigate(["/login"]);
        }

        if(Authentication.isAuthenticated() == "student")
        {
          this.router.navigate(["/home"]);
        }
        return true;
        break;
      case "profiel":
        if(Authentication.isAuthenticated() == "none")
        {
          this.router.navigate(["/login"]);
        }
        return true;
        break;
      case "projecten/project-edit":
        if(Authentication.isAuthenticated() == "none")
        {
          this.router.navigate(["/login"]);
        }
        if(Authentication.isAuthenticated() == "student")
        {
          this.router.navigate(["/home"]);
        }
        return true;
        break;
      case "berichten":
        if(Authentication.isAuthenticated() == "none")
        {
          this.router.navigate(["/login"]);
        }
        if(Authentication.isAuthenticated() == "teacher")
        {
          this.router.navigate(["/dashboard"]);
        }
        return true;
        break;
      default:
        this.router.navigate(["/login"]);
        return true;
        break;
    }
  }
}
