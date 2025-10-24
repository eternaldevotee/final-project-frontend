import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { BookingModel } from '../../models/BookingModel';

@Injectable({
  providedIn: 'root'
})
export class BookingserviceService {

  constructor(private rest: HttpClient) { }

  strUrl : string = "http://localhost:8080/booking/getBooking";

  strUrl1 : string = "http://localhost:8080/booking/setBooking";
  strUrl2 : string  = "http://localhost:8080/agent/packages"

  //insert customer info
  createBookingDetails(booking :BookingModel):Observable<BookingModel>{
    console.log(booking);
    return this.rest.post<BookingModel>(`${this.strUrl1}`,booking).pipe(
          retry(1),
          catchError((error) => {
            console.error("Error fetching user:", error);
            return throwError(() => new Error("Something went wrong while connecting to the server.Can't book now!!, Please try again later."));
          })
        );
  }
  
  getBookingsById(userId:any):Observable<BookingModel[]>{
    return this.rest.get<BookingModel[]>(`${this.strUrl}?userID=${userId}`).pipe(
          retry(1),
          catchError((error) => {
            console.error("Error fetching user:", error);
            return throwError(() => new Error("Something went wrong while connecting to the server. Cannot fetch the bookings, Please try again later."));
          })
        );
  }

  //get by pkg id
  getBookingsByPkgID(packageID:any):Observable<BookingModel[]>{
    console.log("inside the show bookings" , packageID);
    return this.rest.get<BookingModel[]>(`${this.strUrl2}?packageID=${packageID}/showBookings`)
  }
}
