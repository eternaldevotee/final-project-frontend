import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { PaymentModel } from '../models/PaymentModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(private http: HttpClient) {}

  strUrl : string = "http://localhost:8080/payment/checkout";
  // Create Razorpay order
  createOrder(payment: PaymentModel): Observable<any> {
    return this.http.post<any>(`${this.strUrl}`,payment);
  }

}