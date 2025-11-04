import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserModel } from '../../models/UserModel';

import { map,retry,catchError } from 'rxjs/operators';
import { SignUpRequest } from '../../models/Requests/SignUpRequest';
import { LoginRequest } from '../../models/Requests/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private rest: HttpClient) { }

  strUrl : string = "http://localhost:9090/user";

  url:string="http://localhost:9090/customer";

  // strUrl1 : string = "http://localhost:8080/user/setUser" 

  // strUrl2 : string = "http://localhost:8080/user/getUserByEmail";

  // Get users by username  
  getUserByEmailId(emailId: string): Observable<UserModel> {
    const url = `${this.strUrl}/getUserByEmail?email=${emailId}`;
    console.log("Fetching user data from:", url);

    return this.rest.get<UserModel[]>(`${this.strUrl}/getUserByEmail?email=${emailId}`).pipe(
      map(users => users[0])
    ).pipe(
          retry(1),
          catchError((error) => {
            console.error("Error fetching user:", error);
            return throwError(() => new Error("Something went wrong while connecting to the server. Please try again later."));
          })
        );
  }


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
  userLogin(request :LoginRequest):Observable<any>{
    return this.rest.post(`${this.url}/login`,request).pipe(
          catchError((error : HttpErrorResponse) => {
            return throwError(() => error);
          })
        );
  }
}
