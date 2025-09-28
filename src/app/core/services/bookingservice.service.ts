import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingModel } from '../models/BookingModel';


@Injectable({
  providedIn: 'root'
})
export class BookingserviceService {

  constructor(private rest: HttpClient) { }

  strUrl : string = "http://localhost:3000/Booking";

  //insert customer info
  createBookingDetails(booking :BookingModel):Observable<BookingModel>{
    console.log(booking);
    return this.rest.post<BookingModel>(`${this.strUrl}`,booking);
  }
  
  getBookingsById(userId:any):Observable<any>{
    return this.rest.get(`${this.strUrl}?UserId=${userId}`)
  }
}
