import { Component, OnInit } from '@angular/core';
import { SearchserviceService } from '../../Services/searchservice.service';
import { ShareloginService } from '../../Services/sharelogin.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
   isLoggedIn!:boolean;

  constructor(private shareDataService : ShareloginService , private router : Router) {}

    ngOnInit(): void {
      this.shareDataService.loginStatus$.subscribe(status => {
        this.isLoggedIn = status;
        console.log('Login status in navbar:', this.isLoggedIn);
      });
  }

  routeToSignIn() {
    this.router.navigate(['/agentlogin'])
  }
  onClick() {
      this.shareDataService.setLoginStatus(false);
      this.shareDataService.logOff();
  }
}
