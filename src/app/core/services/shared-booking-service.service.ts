import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedBookingServiceService {

  constructor() { }
  private packageIdSource = new BehaviorSubject<string | null>(null);
  currentPackageId$ = this.packageIdSource.asObservable();


  setPackageId(id : string) {
    this.packageIdSource.next(id);
  }
}
