import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-cancelled',
  standalone: false,
  templateUrl: './payment-cancelled.component.html',
  styleUrl: './payment-cancelled.component.css'
})
export class PaymentCancelledComponent {

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/home']); // Adjust route as needed
  }

}
