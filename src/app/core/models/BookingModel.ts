import { BookingStatus } from "./enums/BookingStatus";

export interface BookingModel{
  bookingID: any;
  userID: any;
  packageID: any;
  date: any;
  status: BookingStatus;
  noOfAdults: number;
  noOfChildren: number;
  insuranceStatus: boolean;
  paymentID: any;
}