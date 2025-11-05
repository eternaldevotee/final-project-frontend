import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../../models/Reposonse/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class ShareloginService {
    private loginState = new BehaviorSubject<boolean>(this.getInitialLoginState());
    loginState$ = this.loginState.asObservable();
  
  
    private getInitialLoginState(): boolean {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
  
    login(response:LoginResponse) {
      this.loginState.next(true);
      localStorage.setItem('userID', response.userID);
      localStorage.setItem('name',response.name)
      localStorage.setItem('role',response.role)
      localStorage.setItem('token', response.token)
      localStorage.setItem('isLoggedIn', 'true');
    }
  
    logOff() {
      this.loginState.next(false);
      localStorage.removeItem('userID');
      localStorage.removeItem('name');
      localStorage.removeItem('role');
      localStorage.removeItem('token');
      localStorage.setItem('isLoggedIn', 'false');
    }
  
    isLoggedIn(): boolean {
      return this.loginState.getValue();
    }
  
    getToken():any{
      return localStorage.getItem('token');
    }
    getUserId(): any {
      return localStorage.getItem('userID');
    }
  
    getName(): any {
      return localStorage.getItem('name');
    }
  
    getRole(): any {
      return localStorage.getItem('role');
    }
}
