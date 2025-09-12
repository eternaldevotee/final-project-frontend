import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

export interface TravelPackage {
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

  getPackages(): Observable<TravelPackage[]> {
    return this.http.get<TravelPackage[]>(this.baseUrl);
  }

  createPackage(pkg: Omit<TravelPackage, 'PackageID'>): Observable<TravelPackage> {
    return this.getPackages().pipe(
      map(list => (list.length ? Math.max(...list.map(p => p.PackageID)) + 1 : 1)),
      switchMap(nextId => this.http.post<TravelPackage>(this.baseUrl, { ...pkg, PackageID: nextId }))
    );
  }
}

