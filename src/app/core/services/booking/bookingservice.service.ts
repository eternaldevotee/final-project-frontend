import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { BookingModel } from '../../models/BookingModel';
import { BookingResponseModel } from '../../models/Reposonse/BookingResponseModel';
import { BookingRequest } from '../../models/Requests/BookingRequest';
import { BookingResponse } from '../../models/Reposonse/BookingResponse';

@Injectable({
  providedIn: 'root'
})
export class BookingserviceService {

  constructor(private rest: HttpClient) { }

  strUrl : string = "http://localhost:9090/customer/booking";



  //insert customer info
  createBookingDetails(booking :BookingRequest):Observable<BookingResponse>{
    return this.rest.post<BookingResponse>(`${this.strUrl}/setBooking`,booking).pipe(
          retry(1),
          catchError((err) => {

              if (err.status === 0) {
                console.error('Network error or CORS issue:', err);
              } else {
                console.error(`Backend returned code ${err.status}`, err.error);
              }

            return throwError(() => new Error("Something went wrong while connecting to the server.Can't book now!!, Please try again later."));
          })
        );
  }
  
  getBookingsById(userId:any):Observable<BookingModel[]>{
    return this.rest.get<BookingModel[]>(`${this.strUrl}/getBookingByUsrID?userID=${userId}`).pipe(
          retry(1),
          catchError((error) => {
            console.error("Error fetching user:", error);
            return throwError(() => new Error("Something went wrong while connecting to the server. Cannot fetch the bookings, Please try again later."));
          })
        );
  }

  updateBookingStatus(bookingID:any):Observable<BookingModel>{
    return this.rest.put<BookingModel>(`${this.strUrl}/updateBookingStatus?bookingID=${bookingID}`,{});
  }
  
  updatePaymentStatusInBooking(bookingID:any):Observable<BookingModel>{
   return this.rest.put<BookingModel>(`${this.strUrl}/updatePaymentStatus?bookingID=${bookingID}`,{});
  }

  //get by pkg id
  getBookingsByPkgID(packageID:any):Observable<BookingResponse[]>{
    console.log("inside the show bookings !!! " , packageID);
    return this.rest.get<BookingResponse []>(`${this.strUrl}/getAllBookingByPkgID?packageID=${packageID}`) 
  }

  getBookingByBookingID(bookingID:string):Observable<BookingResponseModel>{
    return this.rest.get<BookingResponseModel[]>(`${this.strUrl}/getBookingByBookingID?bookingID=${bookingID}`).pipe(
      map(bookingResponseModel => bookingResponseModel[0])
    ).pipe(
          retry(1),
          catchError((error) => {
            console.error("Error fetching booking details:", error);
            return throwError(() => new Error("Something went wrong while connecting to the server. Please try again later."));
          })
        );
  }
}