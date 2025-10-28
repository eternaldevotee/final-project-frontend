import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerLoginStateService } from '../../../core/services/loginstate/customer-login-state.service';

@Component({
  selector: 'app-agent-home',
  standalone: false,
  templateUrl: './agent-home.component.html',
  styleUrl: './agent-home.component.css'
})
export class AgentHomeComponent {
  constructor(private router: Router , private state : CustomerLoginStateService){}
  navigateTo(path : string) {
    this.router.navigate([`/${path}`]);
  }

  ngOnInit() {
    console.log("the name of agent is " , this.state.getName());
  }
}
