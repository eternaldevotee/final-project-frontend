import { Component } from '@angular/core';
import { ShareloginService } from '../../../core/services/loginstate/sharelogin.service';


@Component({
  selector: 'admin-navbar',
  standalone: false,
  templateUrl: './adminnavbar.component.html',
  styleUrl: './adminnavbar.component.css'
})
export class AdminNavbarComponent{
   isLoggedIn!:boolean;

  constructor(private shareDataService : ShareloginService) {}

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
  }
  
  onClick() {

      this.shareDataService.logOff();
  }
}
