import { Component, OnInit } from '@angular/core';
import { SearchserviceService } from '../../Service/searchservice.service';
import { ShareloginService } from '../../Service/sharelogin.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

   isLoggedIn!:boolean;




  constructor(private shareDataService : ShareloginService) {}

    ngOnInit(): void {

      this.shareDataService.loginStatus$.subscribe(status => {
        this.isLoggedIn = status;
        console.log('Login status in navbar:', this.isLoggedIn);
      });

  }
}
