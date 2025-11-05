import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingserviceService } from '../../../core/services/booking/bookingservice.service';
import { BookingModel } from '../../../core/models/BookingModel';
import { PaymentModel } from '../../../core/models/PaymentModel';
import { PaymentServiceService } from '../../../core/services/payment/payment-service.service';
import { BookingResponseModel } from '../../../core/models/Reposonse/BookingResponseModel';

@Component({
  selector: 'app-order-details',
  standalone: false,
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent{

  constructor(private router: ActivatedRoute, private bookingService: BookingserviceService, private paymentService: PaymentServiceService){}

  bookingID!:string;
  bookingResponseModel!:BookingResponseModel;

  ngOninit(){
  const bookingID =this.router.snapshot.paramMap.get('id')??'';

  this.bookingService.getBookingByBookingID(bookingID).subscribe({
    next:response=>{
      this.bookingResponseModel=response
      // console.log("Hello",this.bookingResponseModel)
    },
    error:err=>console.log("Error fetching booking details",err)
  })

  }
  
}
