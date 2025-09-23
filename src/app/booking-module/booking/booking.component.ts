import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BookingserviceService } from '../../Service/bookingservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

  bookingForm = new  FormGroup({
      date: new FormControl('',[Validators.required]),
      Adults: new FormControl (1, [Validators.required, Validators.min(1)]),
      Children: new FormControl(0, [Validators.required, Validators.min(0)]),
  })
  
  constructor(private restservice: BookingserviceService, private router :ActivatedRoute){}

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
      console.log('Booking Data:', this.bookingForm.value);
      // Proceed to payment or confirmation logic

      const bookingform={
        BookingID:1234,
        UserId:1234,
        PackageID:Number(this.router.snapshot.paramMap.get('PackageID')),
        date:this.bookingForm.get('date')?.value??'',
        Status:"Success",
        Adults: this.bookingForm.get('Adults')?.value ?? 1,
        Children: this.bookingForm.get('Children')?.value ?? 0,

        PaymentID:1234
      }

      this.restservice.createBookingDetails(bookingform).subscribe(data =>{
          alert("Booked successfully!");
        })
    }
  }
}


export class BookingForm{
        BookingID!:number;
        UserId!:number;
        PackageID!:number;
        date!:string;
        Status!:string;
        Adults!:number;
        Children!:number;
        PaymentID!:number;
      }