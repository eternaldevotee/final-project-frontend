import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareloginService } from '../../../../core/services/loginstate/sharelogin.service';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    this.errorMessage = null;
    const apiUrl = `http://localhost:3000/User?Name=${encodeURIComponent(this.username)}&Password=${encodeURIComponent(this.password)}&Role=admin`;
    this.http.get<any[]>(apiUrl).subscribe({
      next: (users) => {
        if (users && users.length > 0) {

          const userId = users[0].UserId;
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
