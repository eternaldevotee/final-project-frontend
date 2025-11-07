// import { TestBed } from '@angular/core/testing';

// import { BookingserviceService } from './bookingservice.service';
// import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
// import { BookingModel } from '../../models/BookingModel';

// fdescribe('BookingserviceService', () => {
//   let service: BookingserviceService;
//   let httpMock: HttpTestingController;

//   const mockBooking: BookingModel = {
//     BookingID: 'B001',
//     UserId: 'U001',
//     PackageID: 101,
//     date: '2025-10-10',
//     Status: 'Confirmed',
//     Adults: 2,
//     Children: 1,
//     PaymentID: 'PAY123'
//   };


//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [BookingserviceService]
//     });

//     service = TestBed.inject(BookingserviceService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpMock.verify(); 
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should create booking details', () => {
//     service.createBookingDetails(mockBooking).subscribe(response => {
//       expect(response).toEqual(mockBooking);
//     });

//     const req = httpMock.expectOne('http://localhost:3000/Booking');
//     expect(req.request.method).toBe('POST');
//     expect(req.request.body).toEqual(mockBooking);
//     req.flush(mockBooking);
//   });

//   it('should fetch bookings by user ID', () => {
//     service.getBookingsById('U001').subscribe(bookings => {
//       expect(bookings.length).toBe(1);
//       expect(bookings[0]).toEqual(mockBooking);
//     });

//     const req = httpMock.expectOne('http://localhost:3000/Booking?UserId=U001');
//     expect(req.request.method).toBe('GET');
//     req.flush([mockBooking]);
//   });
// });