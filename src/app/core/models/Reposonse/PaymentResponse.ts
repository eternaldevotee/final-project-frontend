export interface PaymentResponse {
  paymentID: string;
  packageID: string;
  bookingID: string;
  userID: string;
  amount: number;
  status: string;
}
