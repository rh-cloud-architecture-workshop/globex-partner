import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  isUserAuthenticated:boolean;
  isMenuCollapsed: boolean = false;
  userEmail:string = "";
  user:any
  router:Router;

  constructor(  router: Router) {
    this.isUserAuthenticated = false;
    this.getUserFromStorage()
    this.router = router;
  }


  ngOnInit() {
    this.getUserFromStorage();
  }

  authenticateUser() {

    this.isUserAuthenticated = true;
    this.write("currentuser", {email: this.userEmail, loggedIn :true})
    this.router.navigateByUrl("/products");

  }

  logout() {
      this.isUserAuthenticated = false;
      this.user.loggedIn = false;
      this.write("currentuser", null)
  }

  private write(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

   getUserFromStorage(): void {
    this.user = JSON.parse( localStorage.getItem("currentuser"));
    if(this.user==null) {
      this.user = {email: "", loggedIn :false}
    }
    console.log("this.user ", this.user )
  }
}
