import { Component ,ElementRef,OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../../../core/services/auth/authservice.service';
import { ShareloginService } from '../../../../core/services/loginstate/sharelogin.service';
import { UserModel } from '../../../../core/models/UserModel';
import { CustomerLoginStateService } from '../../../../core/services/loginstate/customer-login-state.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginRequest } from '../../../../core/models/Requests/LoginRequest';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login!:UserModel;
  userExists!:boolean;  
  loginRequest!:LoginRequest;

  constructor(private restservice:AuthserviceService, private customerLoginStateService:CustomerLoginStateService, private router: Router){}

  ngOnInit(): void {
    this.login={
      userID:'',
      name:'',
      email:'',
      password:'',
      role:'',
      contactNumber:''
    }
  }

  onSubmit(loginForm: NgForm) {

    this.loginRequest={
      email:loginForm.value.emailId,
      password:loginForm.value.password
    }

    this.restservice.userLogin(this.loginRequest).subscribe({
      next: (response) => {
        this.customerLoginStateService.login(response);
        
        alert('Login successful!');
        this.router.navigate(['']);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        alert(err.error || 'Login failed. Please check your credentials.');
      }
    })
  }
}

