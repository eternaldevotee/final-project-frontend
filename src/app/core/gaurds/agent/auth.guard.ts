import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ShareloginService } from '../../services/loginstate/sharelogin.service';



export const authGuard: CanActivateFn = (route, state) => {
   const shareLoginService = inject (ShareloginService);

  if(shareLoginService.isLoggedIn() && shareLoginService.getRole()==='ROLE_AGENT'){
     return true
  }else{
     return false
  }
};
