import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../../../core/services/auth/authservice.service';
import { ShareloginService } from '../../../../core/services/loginstate/sharelogin.service';
import { UserModel } from '../../../../core/models/UserModel';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginRequest } from '../../../../core/models/Requests/LoginRequest';
import { CustomerLoginStateService } from '../../../../core/services/loginstate/customer-login-state.service';


@Component({
  selector: 'app-agent-login',
  standalone: false,
  templateUrl: './agent-login.component.html',
  styleUrl: './agent-login.component.css'
})
export class AgentLoginComponent {

  ALogin!:UserModel;
  userExists!:boolean;  
  loginRequest!:LoginRequest;

  constructor(private restservice:AuthserviceService, private sharedataservice:ShareloginService, private router: Router){}
  
  ngOnInit(): void {
    this.ALogin={
      userID:'',
      name:'',
      email:'',
      password:'',
      role:'',
      contactNumber:''
    }
  }
  onSubmit(AloginForm: NgForm) {
    
    this.loginRequest={
      email:AloginForm.value.emailID,
      password:AloginForm.value.password
    }

    console.log(this.loginRequest);

    this.restservice.userLogin(this.loginRequest).subscribe({
      next: (response) => {
        this.sharedataservice.login(response);
        alert('Login successful!');
        this.router.navigate(['/agent/home']);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        alert(err.error || 'Login failed. Please check your credentials.');
      }
    })
  }
}
