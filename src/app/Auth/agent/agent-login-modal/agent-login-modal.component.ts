import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-login-modal',
  standalone: false,
  templateUrl: './agent-login-modal.component.html',
  styleUrl: './agent-login-modal.component.css'
})
export class AgentLoginModalComponent {
  constructor(private router: Router) {}
  
  navigateTo(view: string) {
    this.router.navigate([{ outlets: { modal: [view] } }]);
  }
}
