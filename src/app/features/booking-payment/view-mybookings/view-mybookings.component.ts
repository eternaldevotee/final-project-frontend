import { Component, OnInit } from '@angular/core';
import { BookingserviceService } from '../../../core/services/bookingservice.service';
import { ActivatedRoute } from '@angular/router';
import { ShareloginService } from '../../../core/services/sharelogin.service';
import { BookingModel } from '../../../core/models/BookingModel';


@Component({
  selector: 'app-view-mybookings',
  standalone: false,
  templateUrl: './view-mybookings.component.html',
  styleUrl: './view-mybookings.component.css'
})

export class ViewMybookingsComponent implements OnInit{

  constructor(private restService: BookingserviceService, private route: ActivatedRoute,private shareLoginService : ShareloginService){}

  bookings:BookingModel[]=[];

  ngOnInit(){
     this.route.paramMap.subscribe(params => {
      const userId = this.shareLoginService.getUserId();
      this.restService.getBookingsById(userId).subscribe(booking =>{
        this.bookings=booking;
      })
     })
  }  
}