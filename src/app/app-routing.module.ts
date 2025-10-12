import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './features/auth/admin/admin-login/admin-login.component';
import { SignupComponent } from './features/auth/customer/signup/signup.component';
import { CardComponent } from './shared/ui/card/card.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import { HomeComponent } from './features/home/home.component';
import { PrivacyComponent } from './shared/ui/footer-content/privacy/privacy.component';
import { TncComponent } from './shared/ui/footer-content/tnc/tnc.component';
import { FaqComponent } from './shared/ui/footer-content/faq/faq.component'

import { AgentControlComponent } from './features/auth/admin/agent-control/agent-control.component';
import { AdminlayoutComponent } from './features/auth/admin/adminlayout/adminlayout.component';
import { CardDetailComponent } from './shared/ui/card-detail/card-detail.component';

import { AdminPackagesComponent } from './features/auth/admin/admin-packages/admin-packages.component';
import { LoginComponent } from './features/auth/customer/login/login.component';
import { AgentPackageDetailComponent } from './features/agent-package-detail/agent-package-detail.component';
import { PackageControlComponent } from './features/auth/admin/package-control/package-control.component';
import { CurrentagentComponent } from './features/auth/admin/currentagent/currentagent.component';
import { SignuprequestsComponent } from './features/auth/admin/signuprequests/signuprequests.component';

import { ViewSearchedPackagesComponent } from './features/search-module/view-searched-packages/view-searched-packages.component';
import { BookingFormComponent } from './features/booking-payment/booking-form/booking-form.component';
import { ListPackagesComponent } from './features/list-packages/list-packages.component';
import { authGuard } from './core/gaurds/agent/auth.guard';
import { AgentSignupComponent } from './features/auth/agent/agent-signup/agent-signup.component';
import { AgentLoginComponent } from './features/auth/agent/agent-login/agent-login.component';
import { ReviewAdminComponent } from './features/reviews-ratings/review-admin/review-admin.component';
import { ViewMybookingsComponent } from './features/booking-payment/view-mybookings/view-mybookings.component';
import { customerAuthGuardGuard } from './core/gaurds/customer/customer-auth-guard.guard';


export const routes: Routes = [
  
    //customer
    {path:'login',        component:LoginComponent},
    {path:'signup',       component:SignupComponent},
    {path:'home',         component:HomeComponent,
      children:[    
        {path:'viewsearch/:Location', component: ViewSearchedPackagesComponent},
        {path : 'packages',           component : CardComponent}
      ]
    },
    {path:'',redirectTo:'/home',pathMatch:'full'},

    {path:'privacy',component:PrivacyComponent},
    {path:'tnc',component:TncComponent},
    {path:'faq',component:FaqComponent},
    {path : 'package/:id', component : CardDetailComponent},
    {path : 'booking/:PackageID',component:BookingFormComponent, canActivate:[customerAuthGuardGuard]},
    {path : 'mybookings',component: ViewMybookingsComponent,canActivate:[customerAuthGuardGuard]},


    //admin
    {path:'adminlogin',component:AdminLoginComponent},
    {path: 'adminlayout', component: AdminlayoutComponent},
    {path:'adminpackages',component:AdminPackagesComponent},  

    {path:'admindashboard',component:AdminlayoutComponent,
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

    //agent
    {path:'agentlogin',   component: AgentLoginComponent },
    {path:'agentsignup',  component: AgentSignupComponent },
    {path : 'agent' , component : ListPackagesComponent, canActivate:[authGuard],
      children:[
        {path : 'agent/home', component : ListPackagesComponent},
        // {path : 'agent/packages' , component : ListPackagesComponent},
      ]
    },
    {path : 'agent/packages', component: ListPackagesComponent,canActivate:[authGuard]},
    
    {path : 'agent/create-package' , component : DashboardComponent, canActivate:[authGuard]},
    {path : 'agent/package/:id', component :AgentPackageDetailComponent, canActivate:[authGuard]},
    {path : 'edit-package/:id', component : DashboardComponent,canActivate:[authGuard]},
    {path : 'agent/package/:id', component :AgentPackageDetailComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
