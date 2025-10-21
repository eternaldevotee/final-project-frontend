import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserModel } from '../../models/UserModel';

import { map,retry,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private rest: HttpClient) { }

  strUrl : string = "http://localhost:8080/user";

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
  setUserDetails(signup :UserModel):Observable<UserModel>{
    console.log("Posting user data to:", `${this.strUrl}/setUser`,signup);

    return this.rest.post<UserModel>(`${this.strUrl}/setUser`,signup).pipe(
          retry(1),
          catchError((error) => {
            console.error("Error fetching user:", error);
            return throwError(() => new Error("Something went wrong while connecting to the server. Sign up failed!!, Please try again later."));
          })
        );
  }
}
