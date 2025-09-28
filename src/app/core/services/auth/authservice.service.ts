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

  strUrl : string = "http://localhost:3000/User";

  // Get users by username  
  getUserByEmailId(emailId: string): Observable<UserModel> {
    const url = `${this.strUrl}?Email=${emailId}`;
    console.log("Fetching user data from:", url);

    return this.rest.get<UserModel[]>(`${this.strUrl}?Email=${emailId}`).pipe(
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
    console.log("Posting user data to:", `${this.strUrl}`,signup);

    return this.rest.post<UserModel>(`${this.strUrl}`,signup).pipe(
          retry(1),
          catchError((error) => {
            console.error("Error fetching user:", error);
            return throwError(() => new Error("Something went wrong while connecting to the server. Sign up failed!!, Please try again later."));
          })
        );
  }

  //fetchesSimilarData
  fetchMatchingPackages(searchValue:string):Observable<any>{
    // console.log(this.rest.get(`${this.strUrl}Travel?Title_like=${searchValue}`));
    return this.rest.get(`${this.strUrl}Travel?Title_like=${searchValue}`);
  }
}
