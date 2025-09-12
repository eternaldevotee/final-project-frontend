import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface TravelPackage {
  PackageId: string;
  Title : string;
  Description : string;
  Duration : string;
  Price : number;
  IncludedServices : string[];
  ImageSrc : string;
}
@Injectable({
  providedIn: 'root'
})
export class DynamicCardService {
  apiUrl:string = 'http://localhost:3000/TravelPackage';
  
  
  constructor(private http : HttpClient) { }

  getPackages() : Observable<any> {
    console.log(this.apiUrl)
    return this.http.get(this.apiUrl)
  }
}