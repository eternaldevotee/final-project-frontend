import { HttpClient } from '@angular/common/http';
import { Component ,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthserviceService } from '../../../../Service/authservice.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  emailId!:string;
  password!:string;
  login!:Login;
  userExists!:boolean;
  
  ngOnInit(): void {
    this.login={
      emailId:"",
      password:""
    }
  }

  constructor(private restservice:AuthserviceService){}

  onSubmit(loginForm: NgForm) {
    const emailId = loginForm.value.emailId;

    this.restservice.getUserByEmailId(emailId).subscribe(data =>{
      this.userExists=data.length>0;

      if(this.userExists){
        const password = loginForm.value.password;

        if(password === data[0].Password) //data[0].Password => accessing the Password, since the return value is a single user object inside an array
          alert("Logged in successfully!!");
        else
          alert("Incorrect password!!")
      }else{
        alert("Email not registered!!");
       }
    })
  }

}

class Login{
  emailId!:string;
  password!:string;

  constructor(emailId:string, password:string){
    this.emailId=emailId;
    this.password=password;
  }
}
