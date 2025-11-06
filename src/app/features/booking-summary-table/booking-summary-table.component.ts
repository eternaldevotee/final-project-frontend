import { Component } from '@angular/core';
import { BookingModel } from '../../core/models/BookingModel';
import { ShowBookingsService } from '../../core/services/show-bookings.service';
import { SharedBookingServiceService } from '../../core/services/booking/shared-booking-service.service';
import { share } from 'rxjs';
import { BookingserviceService } from '../../core/services/booking/bookingservice.service';
import { BookingResponse } from '../../core/models/Reposonse/BookingResponse';

@Component({
  selector: 'app-booking-summary-table',
  standalone: false,
  templateUrl: './booking-summary-table.component.html',
  styleUrl: './booking-summary-table.component.css'
})
export class BookingSummaryTableComponent {

  bookings! : BookingResponse[];
  constructor(private showBookingService : ShowBookingsService , private sharedBookingService : SharedBookingServiceService , private bookingService : BookingserviceService){}
  pkgId! : string;
  ngOnInit():void{
    this.sharedBookingService.currentPackageId$.subscribe(id => {
      if(id != null) {
        this.pkgId = id;
        console.log("this is from booking servive " ,this.pkgId);
        
        this.bookingService.getBookingsByPkgID(this.pkgId).subscribe(books => {
          console.log("Bookings are ", books);
          this.bookings = books;
          // console.log(this.bookings[0].payment.paymentID);
        });
        console.log("This are the bookings " ,this.bookings);
      }
    })
    
    
  }
  
}
