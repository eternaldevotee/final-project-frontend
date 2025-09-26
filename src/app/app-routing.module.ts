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

import { AgentControlComponent } from './Auth/admin/agent-control/agent-control.component';
import { AdminlayoutComponent } from './Auth/admin/adminlayout/adminlayout.component';
import { CardDetailComponent } from './Components/card-detail/card-detail.component';

import { AdminPackagesComponent } from './Auth/admin/admin-packages/admin-packages.component';
import { LoginComponent } from './Auth/customer/login/login.component';
import { AgentPackageDetailComponent } from './Components/agent-package-detail/agent-package-detail.component';
import { PackageControlComponent } from './Auth/admin/package-control/package-control.component';
import { CurrentagentComponent } from './Auth/admin/currentagent/currentagent.component';
import { SignuprequestsComponent } from './Auth/admin/signuprequests/signuprequests.component';

import { ViewSearchedPackagesComponent } from './view-searched-packages/view-searched-packages.component';
import { BookingComponent } from './Components/booking/booking.component';
import { ListPackagesComponent } from './Components/list-packages/list-packages.component';
import { AgentNavbarComponent } from './Agent/agent-navbar/agent-navbar.component';
import { authGuard } from './auth.guard';
import { AgentSignupComponent } from './Auth/agent/agent-signup/agent-signup.component';
import { AgentLoginComponent } from './Auth/agent/agent-login/agent-login.component';
import { ReviewAdminComponent } from './reviews/review-admin/review-admin.component';


const routes: Routes = [
    { path: 'agentlogin', component: AgentLoginComponent },
    { path: 'agentsignup', component: AgentSignupComponent },
    {path:'',component:HomeComponent,
      children:[    
        {path:'login', component:LoginComponent, outlet:'modal'},
        {path:'signup', component:SignupComponent, outlet:'modal'},
        {path:'viewsearch/:Location',component: ViewSearchedPackagesComponent},
      ]
    },
    
    {path:'tnc',component:TncComponent},
    {path:'faq',component:FaqComponent},
    {path:'admindashboard',component:AdminlayoutComponent,canActivate:[authGuard],
      children:[
        { path: 'packagecontrol', component: PackageControlComponent },
        {path: 'agentControl', component: AgentControlComponent,
          children: [
            { path: 'currentagent', component: CurrentagentComponent },
            { path: 'signuprequests', component: SignuprequestsComponent }
          ]
        },
        { path: 'adminreviews', component: ReviewAdminComponent}
      ]
    },

    {path:'adminlogin',component:AdminLoginComponent},

    {path:'privacy',component:PrivacyComponent},
    {path: 'adminlayout', component: AdminlayoutComponent},
      
    {path:'adminpackages',component:AdminPackagesComponent},  
    {path : 'packages', component : CardComponent},
    

    {path : 'package/:id', component : CardDetailComponent},
    {path :'agent/package/:id', component :AgentPackageDetailComponent},
    // {path: '**', redirectTo: '', pathMatch: 'full'},
    {path:'booking/:PackageID',component:BookingComponent, canActivate:[authGuard]},
    {path : 'edit-package/:id', component : DashboardComponent},
    {path : 'agent/packages' , component : ListPackagesComponent},
    {path : 'agent/create-package' , component : DashboardComponent},
    {path : 'agent' , component : ListPackagesComponent},
    {path : '', redirectTo:"home", pathMatch:"full"},
    {path : 'agent/home', component : ListPackagesComponent}
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
