import { HttpClient } from '@angular/common/http';
import { Component ,ElementRef,OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthserviceService } from '../../../Services/authservice.service';
import { ShareloginService } from '../../../Services/sharelogin.service';
import { Router } from '@angular/router';

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


  constructor(private restservice:AuthserviceService, private sharedataservice:ShareloginService, private router: Router){}
  @ViewChild('loginModal') loginModal!: ElementRef;

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

          const modalElement = document.getElementById('loginModal');
          const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }

          this.sharedataservice.setLoginStatus(true);
          this.sharedataservice.login();
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

class Login{
  emailId!:string;
  password!:string;

  constructor(emailId:string, password:string){
    this.emailId=emailId;
    this.password=password;
  }
}
