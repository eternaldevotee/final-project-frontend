import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { map,retry,catchError } from 'rxjs/operators';
import { SignUpRequest } from '../../models/Requests/SignUpRequest';
import { LoginRequest } from '../../models/Requests/LoginRequest';
import { LoginResponse } from '../../models/Reposonse/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private rest: HttpClient) { }

  url:string="http://localhost:9090/auth";

  //insert customer info
  setCustomerDetails(request :SignUpRequest):Observable<any>{
    console.log("Posting user data to:", `${this.url}/customer/signup`,request);
    return this.rest.post(`${this.url}/customer/signup`,request).pipe(
          catchError((error : HttpErrorResponse) => {
            return throwError(() => error);
          })
        );
  }

  //insert agent info
  setAgentDetails(request :SignUpRequest):Observable<any>{
    console.log("Posting user data to:", `${this.url}/agent/signup`,request);
    return this.rest.post(`${this.url}/agent/signup`,request).pipe(
          catchError((error : HttpErrorResponse) => {
            return throwError(() => error);
          })
        );
  }

  //customer login
  customerLogin(request :LoginRequest):Observable<LoginResponse>{
    return this.rest.post<LoginResponse>(`${this.url}/customer/login`,request).pipe(
          catchError((error : HttpErrorResponse) => {
            return throwError(() => error);
          })
        );
  }

  //agent login
  agentLogin(request :LoginRequest):Observable<LoginResponse>{
    return this.rest.post<LoginResponse>(`${this.url}/agent/login`,request).pipe(
                catchError((error : HttpErrorResponse) => {
            return throwError(() => error);
          })
        );
  }
  
  //admin login
  adminLogin(request :LoginRequest):Observable<LoginResponse>{
    return this.rest.post<LoginResponse>(`${this.url}/adminlogin`,request).pipe(
          catchError((error : HttpErrorResponse) => {
            return throwError(() => error);
          })
        );
  }
}
