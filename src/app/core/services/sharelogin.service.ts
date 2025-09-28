import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareloginService {
  private loginState = new BehaviorSubject<boolean>(this.getInitialLoginState());
  loginState$ = this.loginState.asObservable();

  private userId: any;

  private getInitialLoginState(): boolean {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }

  login(userid: any) {
    this.userId = userid;
    this.loginState.next(true);
    sessionStorage.setItem('userId', userid);
    sessionStorage.setItem('isLoggedIn', 'true');
  }

  logOff() {
    this.userId = null;
    this.loginState.next(false);
    sessionStorage.removeItem('userId');
    sessionStorage.setItem('isLoggedIn', 'false');
  }

  isLoggedIn(): boolean {
    return this.loginState.getValue();
  }

  getUserId(): any {
    return sessionStorage.getItem('userId');
  }
}
