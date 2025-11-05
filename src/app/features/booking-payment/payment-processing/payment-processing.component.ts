import { Component } from '@angular/core';
import { PaymentServiceService } from '../../../core/services/payment/payment-service.service';
import { Router } from '@angular/router';
import { BookingserviceService } from '../../../core/services/booking/bookingservice.service';

@Component({
  selector: 'app-payment-processing',
  standalone: false,
  templateUrl: './payment-processing.component.html',
  styleUrl: './payment-processing.component.css'
})
export class PaymentProcessingComponent {

  constructor(private paymentService : PaymentServiceService,private bookingService:BookingserviceService ,private router: Router){}

ngOnInit(): void {
  setTimeout(() => {
    const sessionId = sessionStorage.getItem('sessionId');
    const bookingID = sessionStorage.getItem('bookingID');
    
    console.log("This is the session ID: ", sessionId);

    this.paymentService.confirmPayment(sessionId).subscribe({
      next: response => {
        this.bookingService.updatePaymentStatusInBooking(bookingID).subscribe({
          next:response=>{

            this.bookingService.updateBookingStatus(bookingID).subscribe({
              next:response=>console.log("Booking status updated sucessfully"),
              error:err=>console.log("Error in updateBookingStatus:"+err)
            })

            console.log("payment updated sucessfully")
          },
          error:err=> {
            console.log("Error in updatePaymentStatusInBooking:"+err)
          }
        })
        
        if (response) {
          this.router.navigate(['/payment-success'], {replaceUrl:true});
        } else {
          this.router.navigate(['/payment-cancelled'], {replaceUrl:true});
        }
      },
      error: err => console.error("Error on confirmPayment:" + err)
    });
    sessionStorage.removeItem('sessionId');
    sessionStorage.removeItem('bookingID');
    
  }, 2000); // 2000 milliseconds = 2 seconds
}
}
