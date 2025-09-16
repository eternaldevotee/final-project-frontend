import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/customer/login/login.component';
import { SignupComponent } from './Auth/customer/signup/signup.component';
import { CardComponent } from './Components/card/card.component';
import { CardDetailComponent } from './Components/card-detail/card-detail.component';
import { AgentPackageDetailComponent } from './Components/agent-package-detail/agent-package-detail.component';

const routes: Routes = [
    {path:'login', component:LoginComponent, outlet:'modal'},
    {path:'signup', component:SignupComponent, outlet:'modal'},
    {path : 'packages', component : CardComponent},
    //adding route for particular package
    {path : 'package/:id', component : CardDetailComponent},
    {path :'agent/package/:id', component :AgentPackageDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
    
 }
