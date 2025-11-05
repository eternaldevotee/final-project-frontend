import { BookingStatus } from "../enums/BookingStatus";
import { InsuranceStatus } from "../enums/InsuranceStatus";
import { TravelPackageResponse } from "./TravelPackageResponse";
import { UserResponse } from "./UserResponse";
import { PaymentResponse } from "./PaymentResponse";

export interface BookingResponse {
  bookingID: string;
  user: UserResponse;
  travelPackage: TravelPackageResponse;
  date: Date;
  status: BookingStatus;
  noOfAdults: number;
  noOfChildren: number;
  insuranceStatus: InsuranceStatus;
  payment: PaymentResponse;
}
