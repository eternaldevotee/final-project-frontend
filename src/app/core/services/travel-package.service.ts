import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { TravelPackageModel } from '../../core/models/TravelPackageModel'; // adjust path if needed

@Injectable({ providedIn: 'root' })
export class TravelPackageService {
  private baseUrl = 'http://localhost:9090/TravelPackage';

  constructor(private http: HttpClient) {}

  getPackages(): Observable<TravelPackageModel[]> {
    return this.http.get<TravelPackageModel[]>(this.baseUrl);
  }

  createPackage(pkg: Omit<TravelPackageModel, 'packageID'>): Observable<TravelPackageModel> {
    return this.getPackages().pipe(
      map(list => (list.length ? Math.max(...list.map(p => Number(p.packageID))) + 1 : 1)),
      switchMap(nextId => {
        const payload: TravelPackageModel = {
          ...pkg,
          packageID: nextId.toString()
        };
        return this.http.post<TravelPackageModel>(this.baseUrl, payload);
      })
    );
  }
}
