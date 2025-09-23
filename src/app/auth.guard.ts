import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ShareloginService } from './Services/sharelogin.service';

export const authGuard: CanActivateFn = (route, state) => {
   const shareloginService = inject (ShareloginService);

  if(shareloginService.isLoggedIn()){
     return true
  }else{
     return false
  }
};
