import { Component } from '@angular/core';
import { ShareloginService } from '../../Services/sharelogin.service';

@Component({
  selector: 'app-agent-navbar',
  standalone: false,
  templateUrl: './agent-navbar.component.html',
  styleUrl: './agent-navbar.component.css'
})
export class AgentNavbarComponent {
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
