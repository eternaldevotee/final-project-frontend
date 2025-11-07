import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-success',
  standalone: false,
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent {

  constructor(private router: Router, private http: HttpClient) {}

  goHome(): void {
    this.router.navigate(['/home']); 
  }

  getUserID(): string | null {
    return localStorage.getItem('userID');
  }

  handleDownload(): void {
    const userId = this.getUserID();
    if (!userId) {
      alert('User ID not found. Please log in again.');
      return;
    }

    const url = `http://localhost:9090/customer/booking/download-confirmation/${userId}`;
    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const downloadURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = `booking-confirmation-${userId}.pdf`;
        link.click();
        window.URL.revokeObjectURL(downloadURL);
      },
      error: (err) => {
        console.error('Download failed', err);
        alert('Failed to download confirmation. Please try again later.');
      }
    });
  }
}