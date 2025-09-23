import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchserviceService } from './Service/searchservice.service';
import { ShareloginService } from './Service/sharelogin.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Travel-package-booking-system';
  constructor(private router: Router) {}

  isAdminRoute(): boolean {
    const url = this.router.url || '';
    return url.startsWith('/admin') ||
           url.includes('admindashboard') ||
           url.includes('agentControl') ||
           url.includes('packagecontrol');
  }
}
