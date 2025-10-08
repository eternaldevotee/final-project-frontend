import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ShareloginService } from '../../../core/services/loginstate/sharelogin.service';
import { BookingModel } from '../../../core/models/BookingModel';
import { BookingserviceService } from '../../../core/services/booking/bookingservice.service';

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

  constructor(private restservice: BookingserviceService, private router :ActivatedRoute, private shareLoginService: ShareloginService, private route: Router){}

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
        BookingID:crypto.randomUUID(),
        UserId:this.shareLoginService.getUserId(),
        PackageID:Number(this.router.snapshot.paramMap.get('PackageID')),
        date:this.bookingForm.get('date')?.value??'',
        Status:"Success",
        Adults: this.bookingForm.get('Adults')?.value ?? 1,
        Children: this.bookingForm.get('Children')?.value ?? 0,
        PaymentID:crypto.randomUUID()
      }

      this.restservice.createBookingDetails(this.booking).subscribe({
        next:() =>{
          alert("Booked successfully!");
          this.route.navigate(['home']);
      },
        error:(err)=>{
          alert(err);
        }
      })
    }
  }
}
