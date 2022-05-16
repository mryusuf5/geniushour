import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from "@angular/router";
import {Authentication} from "../core/authentication";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if(route.routeConfig.path == "login" || route.routeConfig.path == "")
    {
      if(Authentication.isAuthenticated() == "student")
      {
        this.router.navigate(["/home"]);
      }
      else if(Authentication.isAuthenticated() == "teacher")
      {
        this.router.navigate(["/dashboard"]);
      }
    }
    else if(route.routeConfig.path == "home")
    {
      if(Authentication.isAuthenticated() == "none")
      {
        this.router.navigate(["/login"]);
      }

      if(Authentication.isAuthenticated() == "teacher")
      {
        this.router.navigate(["/dashboard"]);
      }
    }
    else if(route.routeConfig.path == "dashboard")
    {
      if(Authentication.isAuthenticated() == "none")
      {
        this.router.navigate(["/login"]);
      }

      if(Authentication.isAuthenticated() == "student")
      {
        this.router.navigate(["/home"]);
      }
    }
    else if(route.routeConfig.path == "projecten")
    {
      if(Authentication.isAuthenticated() == "none")
      {
        this.router.navigate(["/login"]);
      }
      if(Authentication.isAuthenticated() == "student")
      {
        this.router.navigate(["/home"]);
      }
    }
    else if(route.routeConfig.path == "projecten")
    {
      if(Authentication.isAuthenticated() == "none")
      {
        this.router.navigate(["/login"]);
      }
      if(Authentication.isAuthenticated() == "student")
      {
        this.router.navigate(["/home"]);
      }
    }
    else
    {
      if(!Authentication.isAuthenticated())
      {
        this.router.navigate(["/login"]);
        return false;
      }
    }
    return true;
  }
}
