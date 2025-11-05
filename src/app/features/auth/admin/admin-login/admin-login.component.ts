import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../../../core/services/auth/authservice.service';
import { ShareloginService } from '../../../../core/services/loginstate/sharelogin.service';
import { UserModel } from '../../../../core/models/UserModel';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginRequest } from '../../../../core/models/Requests/LoginRequest';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {

  login!: UserModel;
  loginRequest!: LoginRequest;

  constructor(
    private authService: AuthserviceService,
    private shareLoginService: ShareloginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.login = {
      userID: '',
      name: '',
      email: '',
      password: '',
      role: '',
      contactNumber: ''
    }
  }

  onSubmit(loginForm: NgForm) {
    this.loginRequest = {
      email: loginForm.value.emailId,
      password: loginForm.value.password
    }

    console.log('Sending admin login request:', this.loginRequest);

    this.authService.adminLogin(this.loginRequest).subscribe({
      next: (response) => {
        console.log('Admin login response:', response);
        this.shareLoginService.login(response);
        alert('Admin login successful!');
        this.router.navigate(['/admindashboard']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Full error object:', err);
        console.error('Error status:', err.status);
        console.error('Error message:', err.message);
        console.error('Error body:', err.error);

        let errorMsg = 'Login failed. Please check your credentials.';
        if (err.error && typeof err.error === 'string') {
          errorMsg = err.error;
        } else if (err.error && err.error.message) {
          errorMsg = err.error.message;
        } else if (err.message) {
          errorMsg = err.message;
        }

        alert(errorMsg);
      }
    });
  }
}


