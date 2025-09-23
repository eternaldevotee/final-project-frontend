import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUp } from '../Auth/customer/signup/signup.component';
import { BookingForm } from '../Components/booking/booking.component';

@Injectable({
  providedIn: 'root'
})
export class BookingserviceService {

  constructor(private rest: HttpClient) { }

  strUrl : string = "http://localhost:3000/";

  //insert customer info
  createBookingDetails(bookingform :BookingForm):Observable<any>{
    console.log(bookingform);
    
    return this.rest.post(`${this.strUrl}Booking`,bookingform);
  }
}
