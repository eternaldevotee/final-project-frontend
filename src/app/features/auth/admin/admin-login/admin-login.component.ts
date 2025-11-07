import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../../../../core/models/Requests/LoginRequest';
import { AuthserviceService } from '../../../../core/services/auth/authservice.service';
import { CustomerLoginStateService } from '../../../../core/services/loginstate/customer-login-state.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  login!:LoginRequest;

  constructor(private restservice:AuthserviceService, private customerLoginStateService:CustomerLoginStateService, private router: Router){}

  ngOnInit(): void {
    this.login={
      email:'',
      password:'',
    }
  }

  onSubmit(loginForm: NgForm) {

    this.login={
      email:loginForm.value.emailId,
      password:loginForm.value.password
    }

    this.restservice.customerLogin(this.login).subscribe({
      next: (response) => {
        this.customerLoginStateService.login(response);
        
        alert('Login successful!');
        this.router.navigate(['/admindashboard']);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        alert(err.error || 'Login failed. Please check your credentials.');
      }
    })
  }
}
