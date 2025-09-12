import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/customer/login/login.component';
import { SignupComponent } from './Auth/customer/signup/signup.component';
import { CardComponent } from './Components/card/card.component';
import {DashboardComponent} from './Auth/agent/dashboard/dashboard.component';

const routes: Routes = [
    
    {path:'login', component:LoginComponent, outlet:'modal'},
    {path:'signup', component:SignupComponent, outlet:'modal'},
    {path : 'packages', component : DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
    
 }
