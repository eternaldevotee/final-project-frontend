import { ShareloginService } from './../../../Services/sharelogin.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router, private service :ShareloginService) {}

  login(): void {
    this.errorMessage = null;
    const apiUrl = `http://localhost:3000/User?Name=${encodeURIComponent(this.username)}&Password=${encodeURIComponent(this.password)}&Role=admin`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (users) => {
        if (users && users.length > 0) {
          this.service.login();
          this.router.navigate(['/admindashboard']);
        } else {
          this.errorMessage = 'Invalid admin credentials';
        }
      },
      error: () => {
        this.errorMessage = 'Unable to reach server. Start json-server on port 3000.';
      }
    });
  }
}
