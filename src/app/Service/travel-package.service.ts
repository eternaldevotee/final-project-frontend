import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

export interface TravelPackage1 {
  id : string,
  PackageID: number;
  Title: string;
  Description: string;
  Duration: string;
  Price: number;
  IncludedServices: string[];
}

@Injectable({ providedIn: 'root' })
export class TravelPackageService {

  private baseUrl = 'http://localhost:3000/TravelPackage';

  constructor(private http: HttpClient) {}

  getPackages(): Observable<TravelPackage1[]> {
    return this.http.get<TravelPackage1[]>(this.baseUrl);
  }

  // createPackage(pkg: Omit<TravelPackage1, 'PackageID'>): Observable<TravelPackage1> {
  //   return this.getPackages().pipe(
  //     map(list => (list.length ? Math.max(...list.map(p => p.PackageID)) + 1 : 1)),
  //     switchMap(nextId => this.http.post<TravelPackage1>(this.baseUrl, { ...pkg, PackageID: nextId }))
  //   );
  // }

    createPackage(pkg: Omit<TravelPackage1, 'PackageID'>): Observable<TravelPackage1> {
    return this.getPackages().pipe(
      map(list => (list.length ? Math.max(...list.map(p => p.PackageID)) + 1 : 1)),
      switchMap(nextId => this.http.post<TravelPackage1>(this.baseUrl, { ...pkg, PackageID: nextId }))
    );
  }
}

