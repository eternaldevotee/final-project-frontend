import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../../Services/authservice.service';
import { ShareloginService } from '../../../Services/sharelogin.service';

@Component({
  selector: 'app-agent-login',
  standalone: false,
  templateUrl: './agent-login.component.html',
  styleUrl: './agent-login.component.css'
})
export class AgentLoginComponent {

  emailId!:string;
  password!:string;
  login!:ALogin;
  userExists!:boolean;  


  constructor(private restservice:AuthserviceService, private sharedataservice:ShareloginService, private router: Router){}


  ngOnInit(): void {
    this.login={
      emailId:"",
      password:""
    }
  }

  onSubmit(loginForm: NgForm) {
    const emailId = loginForm.value.emailId;

    this.restservice.getUserByEmailId(emailId).subscribe(data =>{
      this.userExists=data.length>0;

      if(this.userExists){
        const password = loginForm.value.password;

        if(password === data[0].Password){//data[0].Password => accessing the Password, since the return value is a single user object inside an array
          alert("Logged in successfully!!");
          this.router.navigate(['']);
        }
        else
          alert("Incorrect password!!")
      }else{
        alert("Email not registered!!");
       }
    })
  }
}

class ALogin{
  emailId!:string;
  password!:string;

  constructor(emailId:string, password:string){
    this.emailId=emailId;
    this.password=password;
  }
}
