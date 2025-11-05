import { BookingStatus } from "../enums/BookingStatus";
import { InsuranceStatus } from "../enums/InsuranceStatus";

export interface BookingRequest{
  userID: any;
  packageID: any;
  date: any;
  status: BookingStatus;
  noOfAdults: number;
  noOfChildren: number;
  insuranceStatus: InsuranceStatus;
}