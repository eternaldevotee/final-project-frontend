import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TravelPackageModel } from '../models/TravelPackageModel';


@Injectable({
  providedIn: 'root'
})
export class DynamicCardService {
  apiUrl:string = 'http://localhost:3000/TravelPackage';
  
  
  constructor(private http : HttpClient) { }

  updatePackage(id : string, data : Partial<TravelPackageModel>) : Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);

  }

  getPackageById(id : string) : Observable<TravelPackageModel> {
    console.log("Hello I am in the get Package Id method")
    return this.http.get<TravelPackageModel>(`${this.apiUrl}/${id}`)
  }

  getPackages() : Observable<any> {
    // console.log(this.apiUrl)
    return this.http.get(this.apiUrl)
  }
  
  updatePackage1(id: string, data: Partial<TravelPackageModel>): Observable<TravelPackageModel> {
  return this.http.put<TravelPackageModel>(`${this.apiUrl}/${id}`, data);
}

  deletePackage(id : string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

