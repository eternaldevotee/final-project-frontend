import { CanActivateFn } from '@angular/router';
import { CustomerLoginStateService } from '../../services/loginstate/customer-login-state.service';
import { inject } from '@angular/core';

export const customerAuthGuardGuard: CanActivateFn = (route, state) => {
   const customerLoginStateService = inject (CustomerLoginStateService);

  if(customerLoginStateService.isLoggedIn() && customerLoginStateService.getRole()==='ROLE_CUSTOMER'){
     return true
  }else{
     return false
  }
};
