export interface PaymentModel{
  packageID: string;
  bookingID: string;
  userID: string;
  price: number;
  noOfAdults: number;
  noOfChildren: number;
  currency: string;
}