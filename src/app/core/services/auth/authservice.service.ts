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

  url:string="http://localhost:9090/auth/customerlogin";

  //insert customer info
  setUserDetails(request :SignUpRequest):Observable<any>{
    console.log("Posting user data to:", `${this.url}/setCustomer`,request);
    return this.rest.post(`${this.url}/setCustomer`,request).pipe(
          catchError((error : HttpErrorResponse) => {
            return throwError(() => error);
          })
        );
  }

  //insert agent info
  setAgentDetails(request :SignUpRequest):Observable<any>{
    console.log("Posting user data to:", `${this.url}/setAgent`,request);
    return this.rest.post(`${this.url}/setAgent`,request).pipe(
          catchError((error : HttpErrorResponse) => {
            return throwError(() => error);
          })
        );
  }

  //user login
  userLogin(request :LoginRequest):Observable<LoginResponse>{
    return this.rest.post<LoginResponse>(`${this.url}`,request).pipe(
          catchError((error : HttpErrorResponse) => {
            return throwError(() => error);
          })
        );
  }
}
