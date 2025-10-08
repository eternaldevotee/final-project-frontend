import { Component, OnInit } from '@angular/core';
import { SearchserviceService } from '../../../core/services/search/searchservice.service';
import { ShareloginService } from '../../../core/services/loginstate/sharelogin.service';
import { Route, Router } from '@angular/router';
import { CustomerLoginStateService } from '../../../core/services/loginstate/customer-login-state.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
   isLoggedIn!:boolean;

  constructor(private customerShareDataService : CustomerLoginStateService , private router : Router) {}

    ngOnInit() {
      this.customerShareDataService.loginState$.subscribe(isLoggedIn => {
        this.isLoggedIn=isLoggedIn;
      });
    }

  routeToSignIn() {
    this.router.navigate(['/agentlogin'])
  }
  onClick() {
      this.customerShareDataService.logOff();
  }
}
