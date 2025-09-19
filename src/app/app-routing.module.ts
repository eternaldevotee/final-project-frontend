

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './Auth/admin/login/login.component';
import { SignupComponent } from './Auth/customer/signup/signup.component';
import { CardComponent } from './Components/card/card.component';
import {DashboardComponent} from './Auth/agent/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TncComponent } from './pages/tnc/tnc.component';
import { FaqComponent } from './pages/faq/faq.component'
import { AdminNavbarComponent } from './Auth/admin/admin-navbar/adminnavbar.component';
import { AgentControlComponent } from './Auth/admin/agent-control/agent-control.component';
import { AdminlayoutComponent } from './Auth/admin/adminlayout/adminlayout.component';
import { CardDetailComponent } from './Components/card-detail/card-detail.component';

import { AdminPackagesComponent } from './Auth/admin/admin-packages/admin-packages.component';
import { LoginComponent } from './Auth/customer/login/login.component';
import { AgentPackageDetailComponent } from './Components/agent-package-detail/agent-package-detail.component';
import { PackageControlComponent } from './Auth/admin/package-control/package-control.component';
import { CurrentagentComponent } from './Auth/admin/currentagent/currentagent.component';
import { SinguprequestsComponent } from './Auth/admin/singuprequests/singuprequests.component';





const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:'login', component:LoginComponent, outlet:'modal'},
    {path:'signup', component:SignupComponent, outlet:'modal'},
    {path:'tnc',component:TncComponent},
    {path:'faq',component:FaqComponent},
    {path:'admindashboard',component:AdminNavbarComponent},
    {path:'adminlogin',component:AdminLoginComponent},
    {path:'privacy',component:PrivacyComponent},
    {path:'agentControl',component:AgentControlComponent,children:[{path:'currentagent',component:CurrentagentComponent},{path:'singuprequests',component:SinguprequestsComponent}]},
    {path:'adminlayout',component:AdminlayoutComponent},
    {path : 'packages', component : DashboardComponent},
    {path:'adminpackages',component:AdminPackagesComponent},  
    {path : 'packages', component : CardComponent},
    {path:'packagecontrol',component:PackageControlComponent},
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
