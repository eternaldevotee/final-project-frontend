import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TravelPackageModel } from '../models/TravelPackageModel';

@Injectable({
  providedIn: 'root',
})
export class DynamicCardService {
  // apiUrl: string = 'http://localhost:3000/TravelPackage';
  apiUrl2: string = 'http://localhost:9090/public/packages';
  apiUrl1: string = 'http://localhost:9090/agent/packages';
  crtApi: string = 'http://localhost:9090/agent';

  constructor(private http: HttpClient) {}

  
  

  getPackageById(id: string): Observable<TravelPackageModel> {
    return this.http.get<TravelPackageModel>(`${this.apiUrl1}/${id}`);
  }

  getPackages(): Observable<any> {
    return this.http
      .get(this.apiUrl2)
      .pipe(tap((data) => console.log('Fetched package', data)));
  }


  getPackagesByAdminId(adminID : string) : Observable<any> {
    return this.http.get(`${this.apiUrl1}/id/${adminID}`);
  }

  deletePackage(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl1}/${id}`);
  }



  createPackage(
    pkg: Omit<TravelPackageModel, 'packageID'>
  ): Observable<TravelPackageModel> {
    return this.http.post<TravelPackageModel>(
      `${this.crtApi}/createPackage`,
      pkg
    );
  }

  updatePackage(
    id: string,
    data: Partial<TravelPackageModel>
  ): Observable<any> {
    console.log('in the update package and the package id is ', id);
    return this.http.put(`${this.apiUrl1}/${id}`, data);
  }
}
