import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ShareloginService } from '../../../core/services/loginstate/sharelogin.service';
import { BookingModel } from '../../../core/models/BookingModel';
import { BookingserviceService } from '../../../core/services/booking/bookingservice.service';
import { CustomerLoginStateService } from '../../../core/services/loginstate/customer-login-state.service';
import { PaymentServiceService } from '../../../core/services/payment-service.service';

@Component({
  selector: 'app-booking-form',
  standalone: false,
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})

export class BookingFormComponent {
  booking!:BookingModel;
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
        paymentID:crypto.randomUUID()
      }

      this.restservice.createBookingDetails(this.booking).subscribe({
        next:() =>{
          alert("Booked successfully!");

          const user = {
            name: 'Stany', // You can fetch this from login state or API
            email: 'customer4@example.com',
            contactNumber: '974021322' // Optional
          };

          this.paymentService.createOrder(50000, this.booking.bookingID).subscribe(order => {
            this.paymentService.initiatePayment(order, this.booking.bookingID, user);
          });

          //this.route.navigate(['home']);
      },
        error:(err)=>{
          alert(err);
        }
      })
    }
  }
}
