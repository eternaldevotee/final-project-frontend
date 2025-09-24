import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShareloginService } from '../../../Services/sharelogin.service';

@Component({
  selector: 'admin-navbar',
  standalone: false,
  templateUrl: './adminnavbar.component.html',
  styleUrl: './adminnavbar.component.css'
})
export class AdminNavbarComponent{
   isLoggedIn!:boolean;

  constructor(private shareDataService : ShareloginService) {}

    ngOnInit(): void {
      this.shareDataService.loginStatus$.subscribe(status => {
        this.isLoggedIn = status;
        console.log('Login status in navbar:', this.isLoggedIn);
      });
  }

  onClick() {
      this.shareDataService.setLoginStatus(false);
      this.shareDataService.logOff();
  }
}
