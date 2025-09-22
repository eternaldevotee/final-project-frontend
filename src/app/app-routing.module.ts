import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './Auth/admin/login/login.component';
import { SignupComponent } from './Auth/customer/signup/signup.component';
import { CardComponent } from './Components/card/card.component';
import {DashboardComponent} from './Components/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TncComponent } from './pages/tnc/tnc.component';
import { FaqComponent } from './pages/faq/faq.component'
import { AdminNavbarComponent } from './Auth/admin/admin-navbar/adminnavbar.component';
import { AgentControlComponent } from './Auth/admin/agent-control/agent-control.component';
import { AdminlayoutComponent } from './Auth/admin/adminlayout/adminlayout.component';
import { CardDetailComponent } from './Components/card-detail/card-detail.component';
import { LoginComponent } from './Auth/customer/login/login.component';
import { AgentPackageDetailComponent } from './Components/agent-package-detail/agent-package-detail.component';
import { ViewSearchedPackagesComponent } from './view-searched-packages/view-searched-packages.component';
import { BookingComponent, BookingForm } from './booking-module/booking/booking.component';
import { ListPackagesComponent } from './Components/list-packages/list-packages.component';
import { AgentNavbarComponent } from './Agent/agent-navbar/agent-navbar.component';

const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:'login', component:LoginComponent, outlet:'modal'},
    {path:'signup', component:SignupComponent, outlet:'modal'},
    {path:'tnc',component:TncComponent},
    {path:'faq',component:FaqComponent},
    {path:'admindashboard',component:AdminNavbarComponent},
    {path:'adminlogin',component:AdminLoginComponent},
    {path:'privacy',component:PrivacyComponent},
    {path:'agentControl',component:AgentControlComponent},
    {path:'adminlayout',component:AdminlayoutComponent},
    {path : 'packages', component : DashboardComponent},
    {path : 'packages', component : CardComponent},
    //adding route for particular package
    {path : 'package/:id', component : CardDetailComponent},
    {path :'agent/package/:id', component :AgentPackageDetailComponent},
    {path:'viewsearch/:Location',component: ViewSearchedPackagesComponent},
    {path:'booking/:PackageID',component:BookingComponent},
    {path : 'edit-package/:id', component : DashboardComponent},
    {path : 'agent/packages' , component : ListPackagesComponent},
    {path : 'agent/create-package' , component : DashboardComponent},
    {path : 'agent' , component : AgentNavbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
    
 }
