import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ShareloginService } from '../../../core/services/loginstate/sharelogin.service';
import { BookingModel } from '../../../core/models/BookingModel';
import { BookingserviceService } from '../../../core/services/booking/bookingservice.service';
import { CustomerLoginStateService } from '../../../core/services/loginstate/customer-login-state.service';
import { PaymentServiceService } from '../../../core/services/payment/payment-service.service';
import { PaymentModel } from '../../../core/models/PaymentModel';
import { StripeResponseModel } from '../../../core/models/StripeResponseModel';

@Component({
  selector: 'app-booking-form',
  standalone: false,
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})

export class BookingFormComponent {
  booking!:BookingModel;
  payment!:PaymentModel;
  response!: StripeResponseModel;
  minDate: any;

  bookingForm = new  FormGroup({
      date: new FormControl('',[Validators.required]),
      Adults: new FormControl (1, [Validators.required, Validators.min(1)]),
      Children: new FormControl(0, [Validators.required, Validators.min(0)]),
  })
  
  
  ngOnInit(): void {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0]; // Format to: YYYY-MM-DD
  }

  constructor(private restservice: BookingserviceService, private router :ActivatedRoute, 
    private customerLoginStateService: CustomerLoginStateService, private route: Router,
    private paymentService: PaymentServiceService){}

    packageId!:number|null;

    get Date(){
      return this.bookingForm.get('date');
    }
  
    get Adults(){
      return this.bookingForm.get('Adults');
    }
  
    get Children(){
      return this.bookingForm.get('Children');
    }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.booking={
        bookingID:crypto.randomUUID(),
        userID:this.customerLoginStateService.getUserId(),
        packageID:this.router.snapshot.paramMap.get('PackageID'),
        date:this.bookingForm.get('date')?.value??'',
        status:"Pending",
        noOfAdults: this.bookingForm.get('Adults')?.value ?? 1,
        noOfChildren: this.bookingForm.get('Children')?.value ?? 0,
        paymentID:"hello"
      }

       this.restservice.createBookingDetails(this.booking).subscribe({
         next:() =>{
          console.log(this.booking)
           this.payment={
             packageID: this.booking.packageID,
             bookingID: this.booking.bookingID,
             userID: this.booking.userID,
             price: 200000,
             noOfAdults: this.booking.noOfAdults,
             noOfChildren: this.booking.noOfChildren,
             currency:"INR"
           }
           console.log(this.payment);
           this.paymentService.createOrder(this.payment).subscribe({
             next:response =>{
              this.response = response;
              
               const stripeUrl = response.sessionUrl;

               sessionStorage.setItem('sessionId', response.sessionId);
               sessionStorage.setItem('bookingID', this.booking.bookingID)
               //window.location.href = stripeUrl;
               window.open(stripeUrl, '_blank')
             },
             error:err => console.error("Error on payment: "+ err)
           })
        
       },
         error:(err)=> alert(err)
       })
    }
  }
}
