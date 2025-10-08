import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerLoginStateService {

  private loginState = new BehaviorSubject<boolean>(this.getInitialLoginState());
  loginState$ = this.loginState.asObservable();

  private userId: any;
  private role: any;

  private getInitialLoginState(): boolean {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }

  login(userid: any, role: string) {
    this.userId = userid;
    this.role = role;
    this.loginState.next(true);
    sessionStorage.setItem('userId', userid);
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('isLoggedIn', 'true');
  }

  logOff() {
    this.userId = null;
    this.loginState.next(false);
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('role');
    sessionStorage.setItem('isLoggedIn', 'false');
  }

  isLoggedIn(): boolean {
    return this.loginState.getValue();
  }

  getUserId(): any {
    return sessionStorage.getItem('userId');
  }

  getRole(): any {
    return sessionStorage.getItem('role');
  }
}
