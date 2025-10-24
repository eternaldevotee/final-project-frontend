import { Component } from '@angular/core';
import { BookingModel } from '../../core/models/BookingModel';
import { ShowBookingsService } from '../../core/services/show-bookings.service';
import { SharedBookingServiceService } from '../../core/services/shared-booking-service.service';
import { share } from 'rxjs';

@Component({
  selector: 'app-booking-summary-table',
  standalone: false,
  templateUrl: './booking-summary-table.component.html',
  styleUrl: './booking-summary-table.component.css'
})
export class BookingSummaryTableComponent {

  bookings! : BookingModel[];
  constructor(private showBookingService : ShowBookingsService , private sharedBookingService : SharedBookingServiceService){}
  pkgId! : string;
  ngOnInit():void{
    this.sharedBookingService.currentPackageId$.subscribe(id => {
      if(id != null) {
        this.pkgId = id;
        console.log("this is from booking servive " ,this.pkgId);
        this.showBookingService.showBookings(this.pkgId);
      }
    })
    
    
  }
  
}
