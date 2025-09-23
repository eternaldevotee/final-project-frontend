import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareloginService {

private loginStatus = new BehaviorSubject<boolean>(false);
loginStatus$ = this.loginStatus.asObservable();

  setLoginStatus(status: boolean): void {
    this.loginStatus.next(status);
  }

  blogin :boolean =false;

  login(){
    this.blogin=true;
  }

  logOff(){
    this.blogin = false;
  }

  isLoggedIn(){
    return this.blogin;
  }
}
