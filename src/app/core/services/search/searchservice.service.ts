import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { TravelPackageModel } from '../../models/TravelPackageModel';

@Injectable({
  providedIn: 'root'
})
export class SearchserviceService {


  constructor(private rest: HttpClient) { }

  strUrl : string = "http://localhost:9090/";


  getAllData():Observable<TravelPackageModel[]>{
    return this.rest.get<TravelPackageModel[]>(`${this.strUrl}TravelPackage`).pipe(
      retry(1),
      catchError((error) => {
        console.error("Error fetching user:", error);
        return throwError(() => new Error("Something went wrong while connecting to the server. Sign up failed!!, Please try again later."));
      })
    )
  }
}
