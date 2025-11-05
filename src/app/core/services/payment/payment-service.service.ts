import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentModel } from '../../models/PaymentModel';

@Injectable({
  providedIn: 'root'
})

export class PaymentServiceService {

  constructor(private http: HttpClient) {}

  strUrl : string = "http://localhost:9090/payment/checkout";
  strUrl1 : string = "http://localhost:9090/payment/confirm";

  // Create Stripe order
  createOrder(payment: PaymentModel): Observable<any> {
    return this.http.post<any>(`${this.strUrl}`,payment);
  }

  // Confirm payment
  confirmPayment(sessionId : any):Observable<number>{
    console.log(`${this.strUrl1}?sessionId=${sessionId}`)
    return this.http.post<number>(`${this.strUrl1}?sessionId=${sessionId}`,{});
  }
}