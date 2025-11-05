import { TravelPackageResponse } from "./TravelPackageResponse";
import { UserResponse } from "./UserResponse";
import { PaymentResponse } from "./PaymentResponse";

export interface BookingResponse {
  bookingID: string;
  user: UserResponse;
  travelPackage: TravelPackageResponse;
  date: Date;
  status: string;
  noOfAdults: number;
  noOfChildren: number;
  insuranceStatus: boolean;
  payment:PaymentResponse;
}
