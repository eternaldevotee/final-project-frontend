import { Component } from '@angular/core';
import { ShareloginService } from '../../../core/services/loginstate/sharelogin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'admin-navbar',
  standalone: false,
  templateUrl: './adminnavbar.component.html',
  styleUrl: './adminnavbar.component.css'
})
export class AdminNavbarComponent{
   isLoggedIn!:boolean;
   isDarkMode: boolean = true; // Default to dark mode

  constructor(private shareDataService : ShareloginService, private router: Router) {}

  //   ngOnInit(): void {
  //     // this.shareDataService.loginStatus$.subscribe(status => {
  //     //   this.isLoggedIn = status;
  //     //   console.log('Login status in navbar:', this.isLoggedIn);
  //     // });
  //       this.isLoggedIn= this.shareDataService.isLoggedIn();
  // }

  ngOnInit() {
    this.shareDataService.loginState$.subscribe(isLoggedIn => {
        this.isLoggedIn=isLoggedIn;
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    }
    this.applyTheme();
  }

  onClick() {
      this.shareDataService.logOff();
      this.router.navigate(['/login']); // Navigate to login page after logout
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    // Save preference
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  applyTheme() {
    if (this.isDarkMode) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  }
}
