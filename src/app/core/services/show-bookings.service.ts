import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingModel } from '../models/BookingModel';

@Injectable({
  providedIn: 'root'
})
export class ShowBookingsService {

  constructor(private http: HttpClient) { }

   api : string = 'http://localhost:9090/agent/packages';

   showBookings(packageId : string) : Observable<BookingModel[]> {
    console.log("inside the show bookings" , packageId);
    return this.http.get<BookingModel[]>(`${this.api}/${packageId}/showBookings`)
   }
}
