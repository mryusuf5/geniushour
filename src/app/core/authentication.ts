export class Authentication {
  constructor() {
  }
  static isAuthenticated(): string {
    let userdata = localStorage.getItem("userdata");
    let teacher = localStorage.getItem("teacher");

   if(userdata)
     return "student"
   else if(teacher)
     return "teacher"
   else
     return "none"
  }
}
