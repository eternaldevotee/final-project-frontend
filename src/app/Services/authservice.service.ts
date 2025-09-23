import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUp } from '../Auth/customer/signup/signup.component';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private rest: HttpClient) { }

  strUrl : string = "http://localhost:3000/";

  // Get users by username  
  getUserByEmailId(emailId: string): Observable<any[]> {
    const url = `${this.strUrl}User?Email=${emailId}`;
    console.log("Fetching user data from:", url);
    return this.rest.get<any[]>(url);
  }

  //insert customer info
  setCustomerDetails(signup :SignUp):Observable<any>{
    // console.log(signup);
    return this.rest.post(`${this.strUrl}User`,signup);
  }

  //fetchesSimilarData
  fetchMatchingPackages(searchValue:string):Observable<any>{
    // console.log(this.rest.get(`${this.strUrl}Travel?Title_like=${searchValue}`));
    return this.rest.get(`${this.strUrl}Travel?Title_like=${searchValue}`);
  }
}
