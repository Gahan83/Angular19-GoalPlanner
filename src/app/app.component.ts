import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { User } from './model/User';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  @ViewChild("loginModal") loginModal!: ElementRef
  isLoginFormVisible=signal<boolean>(true);
  loggedUser:any;
  loginObj:User =new User();
  http=inject(HttpClient)

  registerObj:any={
    "userId": 0,
    "emailId": "",
    "password": "",
    "fullName": "",
    "mobileNo":""
  }



  ngOnInit(): void {
    const logUser=localStorage.getItem("user");
    if(logUser)
      this.loggedUser=JSON.parse(logUser);
  }

  public openModal():void
  {
    if(this.loginModal)
    {
      this.loginModal.nativeElement.style.display="block";
    }
  }

  public closeModal():void
  {
    if(this.loginModal)
    {
      this.loginModal.nativeElement.style.display="none";
    }
  }

  public toggleForm():void
  {
    this.isLoginFormVisible.set(!this.isLoginFormVisible());
  }

  public onRegister():void
  {
    this.http.post("https://api.freeprojectapi.com/api/GoalTracker/register",this.registerObj).subscribe((res:any)=>{
      alert("Registration Successful")
      this.closeModal();
    },error=>{
      alert(error.error)
    }
    )
  }

  public onLogin():void
  {
    this.http.post("https://api.freeprojectapi.com/api/GoalTracker/login", this.loginObj).subscribe((res:any)=>{
      alert("login successfull")
      localStorage.setItem("user",JSON.stringify(res));
      this.loggedUser=res;
      this.closeModal();
    },error=>{
      alert(error.error)
    })
  }

  public onLogOff():void{
    this.loggedUser=null;
    localStorage.removeItem("user");
  }
}
