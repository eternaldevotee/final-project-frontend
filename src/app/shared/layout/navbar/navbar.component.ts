import { Component, OnInit } from '@angular/core';
import { SearchserviceService } from '../../../core/services/search/searchservice.service';
import { ShareloginService } from '../../../core/services/sharelogin.service';
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

    ngOnInit() {
      this.shareDataService.loginState$.subscribe(isLoggedIn => {
        this.isLoggedIn=isLoggedIn;
      });
    }

  routeToSignIn() {
    this.router.navigate(['/agentlogin'])
  }
  onClick() {
      this.shareDataService.logOff();
  }
}
