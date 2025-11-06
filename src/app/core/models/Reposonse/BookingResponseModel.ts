import { BookingStatus } from "../enums/BookingStatus";
import { InsuranceStatus } from "../enums/InsuranceStatus";
import { PaymentModel } from "../PaymentModel";
import { TravelPackageModel } from "../TravelPackageModel";
import { UserModel } from "../UserModel";


export interface BookingResponseModel{
  bookingID: any;
  user: UserModel;
  package: TravelPackageModel;
  date: any;
  status: BookingStatus;
  noOfAdults: number;
  noOfChildren: number;
  insuranceStatus: InsuranceStatus;
  payment: PaymentModel;
}