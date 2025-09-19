

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/admin/login/login.component';
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

const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:'login', component:LoginComponent, outlet:'modal'},
    {path:'signup', component:SignupComponent, outlet:'modal'},
    {path:'tnc',component:TncComponent},
    {path:'faq',component:FaqComponent},
    {path:'admindashboard',component:AdminNavbarComponent},
    {path:'adminlogin',component:LoginComponent},
    {path:'privacy',component:PrivacyComponent},
    {path:'agentControl',component:AgentControlComponent},
    {path:'adminlayout',component:AdminlayoutComponent},
    {path : 'packages', component : DashboardComponent},
    {path:'adminpackages',component:AdminPackagesComponent},
    {path : 'packages', component : CardComponent},
    //adding route for particular package
    {path : 'package/:id', component : CardDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
    
 }
