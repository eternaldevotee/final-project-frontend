import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserModel } from '../../models/UserModel';

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
  setUserDetails(request :SignUpRequest):Observable<any>{
    console.log("Posting user data to:", `${this.url}/customersignup`,request);
    return this.rest.post(`${this.url}/customersignup`,request).pipe(
          catchError((error : HttpErrorResponse) => {
            return throwError(() => error);
          })
        );
  }

  //insert agent info
  setAgentDetails(request :SignUpRequest):Observable<any>{
    console.log("Posting user data to:", `${this.url}/agentsignup`,request);
    return this.rest.post(`${this.url}/agentsignup`,request).pipe(
          catchError((error : HttpErrorResponse) => {
            return throwError(() => error);
          })
        );
  }

  //user login
  userLogin(request :LoginRequest):Observable<LoginResponse>{
    return this.rest.post<LoginResponse>(`${this.url}/agentlogin`,request).pipe(
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

  //   //user login
  // agentLogin(request :LoginRequest):Observable<LoginResponse>{
  //   return this.rest.post<LoginResponse>(`${this.url}/customerlogin`,request).pipe(
  //         catchError((error : HttpErrorResponse) => {
  //           return throwError(() => error);
  //         })
  //       );
  // }
}
