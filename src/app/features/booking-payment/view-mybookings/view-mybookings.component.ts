import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareloginService } from '../../../core/services/loginstate/sharelogin.service';
import { BookingModel } from '../../../core/models/BookingModel';
import { BookingserviceService } from '../../../core/services/booking/bookingservice.service';


@Component({
  selector: 'app-view-mybookings',
  standalone: false,
  templateUrl: './view-mybookings.component.html',
  styleUrl: './view-mybookings.component.css'
})

export class ViewMybookingsComponent implements OnInit{

  constructor(private restService: BookingserviceService, private route: ActivatedRoute,private shareLoginService : ShareloginService){}

  bookings:BookingModel[]=[];


  ngOnInit() {
    const userId = this.shareLoginService.getUserId();
    if (userId) {
      this.restService.getBookingsById(userId).subscribe({
        next: booking => this.bookings = booking,
        error: err => console.error('Error fetching bookings:', err)
      });
    }
  }

}