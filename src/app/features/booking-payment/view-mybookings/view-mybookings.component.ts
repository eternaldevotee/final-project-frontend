import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareloginService } from '../../../core/services/loginstate/sharelogin.service';
import { BookingModel } from '../../../core/models/BookingModel';
import { BookingserviceService } from '../../../core/services/booking/bookingservice.service';
import { CustomerLoginStateService } from '../../../core/services/loginstate/customer-login-state.service';
import { BookingRequest } from '../../../core/models/Requests/BookingRequest';
import { BookingResponse } from '../../../core/models/Reposonse/BookingResponse';


@Component({
  selector: 'app-view-mybookings',
  standalone: false,
  templateUrl: './view-mybookings.component.html',
  styleUrl: './view-mybookings.component.css'
})

export class ViewMybookingsComponent implements OnInit{


  constructor(private restService: BookingserviceService, private route: ActivatedRoute,private customerLoginStateService: CustomerLoginStateService){}

  bookings:BookingResponse[]=[];


  ngOnInit() {
    const userID = this.customerLoginStateService.getUserId();
      this.restService.getBookingsById(userID).subscribe({
        next: booking => this.bookings = booking,
        error: err => console.error('Error fetching bookings:', err)
      });
  }


}