import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(private http: HttpClient) {}

  // Create Razorpay order
  createOrder(amount: number, bookingID: string): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/create-order`, {
      amount: amount,
      bookingID: bookingID
    });
  }

  // Update booking status after payment
  updateBookingStatus(bookingID: string, paymentID: string): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/update-booking-status`, {
      bookingID: bookingID,
      paymentID: paymentID
    });
  }

  // Initiate Razorpay checkout
  initiatePayment(orderDetails: any, bookingID: string, user: any): void {
    const options = {
      key: environment.razorpayKeyId,
      amount: orderDetails.amount,
      currency: 'INR',
      name: 'Travel Booking',
      description: 'Package Payment',
      order_id: orderDetails.id,
      handler: (response: any) => {
        this.updateBookingStatus(bookingID, response.razorpay_payment_id).subscribe({
          next: () => alert('✅ Payment successful and booking confirmed!'),
          error: () => alert('⚠️ Payment succeeded but booking update failed.')
        });
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.contactNumber || ''
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }
}