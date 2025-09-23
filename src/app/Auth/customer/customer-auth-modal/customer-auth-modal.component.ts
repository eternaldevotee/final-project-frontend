import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-auth-modal',
  standalone: false,
  templateUrl: './customer-auth-modal.component.html',
  styleUrl: './customer-auth-modal.component.css'
})
export class CustomerAuthModalComponent {

  constructor(private router: Router) {}
  
  navigateTo(view: string) {
    this.router.navigate([{ outlets: { modal: [view] } }]);
  }
}
