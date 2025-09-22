import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface TravelPackage {
  PackageID: number;
  Title : string;
  Description : string;
  DetailedDescription : string;
  Duration : string;
  Price : number;
  IncludedServices : string[];
  ImageSrc : string;
  id: string;
}
@Injectable({
  providedIn: 'root'
})
export class DynamicCardService {
  apiUrl:string = 'http://localhost:3000/TravelPackage';
  
  
  constructor(private http : HttpClient) { }

  updatePackage(id : string, data : Partial<TravelPackage>) : Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);

  }

  getPackageById(id : string) : Observable<TravelPackage> {
    console.log("Hello I am in the get Package Id method")
    return this.http.get<TravelPackage>(`${this.apiUrl}/${id}`)
  }

  getPackages() : Observable<any> {
    // console.log(this.apiUrl)
    return this.http.get(this.apiUrl)
  }

  deletePackage(id : string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}