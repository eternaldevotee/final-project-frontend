import { Component ,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  login!:Login;
  
  ngOnInit(): void {
    this.login={
      emailId:"",
      password:""
    }
  }

  onSubmit(loginForm: NgForm) {}

}

class Login{
  emailId!:string;
  password!:string;

  constructor(emailId:string, password:string){
    this.emailId=emailId;
    this.password=password;
  }
}
