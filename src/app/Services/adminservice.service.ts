// package.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  private apiUrl = 'http://localhost:3000/TravelPackage';

  constructor(private http: HttpClient) {}

  getPackages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deletePackage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
