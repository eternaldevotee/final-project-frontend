import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

 import { BookingModel } from '../../../core/models/BookingModel';
import { BookingserviceService } from '../../../core/services/booking/bookingservice.service';
import { CustomerLoginStateService } from '../../../core/services/loginstate/customer-login-state.service';
import { PaymentServiceService } from '../../../core/services/payment/payment-service.service';
import { PaymentModel } from '../../../core/models/PaymentModel';
import { StripeResponseModel } from '../../../core/models/StripeResponseModel';
import { BookingRequest } from '../../../core/models/Requests/BookingRequest';
import { BookingResponse } from '../../../core/models/Reposonse/BookingResponse';

@Component({
  selector: 'app-booking-form',
  standalone: false,
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})

export class BookingFormComponent {
  booking!:BookingRequest;
  bookingResponse!:BookingResponse;
  payment!:PaymentModel;
  response!: StripeResponseModel;
  minDate: any;

  bookingForm = new  FormGroup({
      date: new FormControl('',[Validators.required]),
      Adults: new FormControl (1, [Validators.required, Validators.min(1)]),
      Children: new FormControl(0, [Validators.required, Validators.min(0)]),
      insurance: new FormControl(false)
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

    get InsuranceStatus(){
      return this.bookingForm.get('insurance');
    }
  onSubmit() {
    if (this.bookingForm.valid) {
      const insuranceValue = this.bookingForm.get('insurance')?.value;
      this.booking={
        userID:this.customerLoginStateService.getUserId(),
        packageID:this.router.snapshot.paramMap.get('PackageID'),
        date:this.bookingForm.get('date')?.value??'',
        status:"PENDING",
        noOfAdults: this.bookingForm.get('Adults')?.value ?? 1,
        noOfChildren: this.bookingForm.get('Children')?.value ?? 0,
        insuranceStatus: insuranceValue ? 'OPTED' : 'NOT_OPTED',
      }
      console.log(this.booking)
       this.restservice.createBookingDetails(this.booking).subscribe({
         next:(response) =>{
           this.bookingResponse=response;

           console.log("This is booking respone: ",this.bookingResponse);

           this.payment={
             packageID: response.travelPackage.packageID,
             bookingID: response.bookingID,
             userID: response.user.userID,
             price: response.travelPackage.price,
             noOfAdults: response.noOfAdults,
             noOfChildren: response.noOfChildren,
             currency:'INR'
           }

           console.log("This is payment: ", this.payment);
           this.paymentService.createOrder(this.payment).subscribe({
             next:response =>{
              this.response = response;
              
               const stripeUrl = response.sessionUrl;
              console.log("This is stripe URL", stripeUrl)
               sessionStorage.setItem('sessionId', response.sessionId);
               sessionStorage.setItem('bookingID', this.bookingResponse.bookingID)
               //window.location.href = stripeUrl;
               window.open(stripeUrl, '_blank')
             },
             error:err => console.error("Error on payment 111: ", err)
           })
        
       },
         error:(err)=> alert(err)
       })
    }
  }
}
