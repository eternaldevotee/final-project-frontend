import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ShareloginService } from '../../services/loginstate/sharelogin.service';
import { CustomerLoginStateService } from '../../services/loginstate/customer-login-state.service';


export const authGuard: CanActivateFn = (route, state) => {
   const shareLoginService = inject (ShareloginService);

  if(shareLoginService.isLoggedIn() && shareLoginService.getRole()==='agent'){
     return true
  }else{
     return false
  }
};
