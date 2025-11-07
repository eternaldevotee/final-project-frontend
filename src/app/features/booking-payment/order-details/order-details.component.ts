import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingserviceService } from '../../../core/services/booking/bookingservice.service';
import { PaymentServiceService } from '../../../core/services/payment/payment-service.service';
import { BookingResponseModel } from '../../../core/models/Reposonse/BookingResponseModel';
import { BookingResponse } from '../../../core/models/Reposonse/BookingResponse';

@Component({
  selector: 'app-order-details',
  standalone: false,
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent{

  constructor(private router: ActivatedRoute, private bookingService: BookingserviceService){}

  bookingID!:string;
  bookingResponse!:BookingResponse;

ngOnInit(): void{
  const bookingID =this.router.snapshot.paramMap.get('id')??'';
console.log("JIIIII",bookingID)
  this.bookingService.getBookingByBookingID(bookingID).subscribe({
    next:response=>{
      this.bookingResponse=response
       console.log("Hello",this.bookingResponse)
    },
    error:err=>console.log("Error fetching booking details",err)
  })

  }
  
}
