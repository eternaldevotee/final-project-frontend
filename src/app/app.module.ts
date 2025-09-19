import { MatExpansionModule, MatAccordion,MatExpansionPanel,MatExpansionPanelHeader,MatExpansionPanelTitle } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CardComponent } from './Components/card/card.component';
import { DashboardComponent } from './Auth/agent/dashboard/dashboard.component';
import { LoginComponent } from './Auth/customer/login/login.component';
import { SignupComponent } from './Auth/customer/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListPackagesComponent } from './Components/list-packages/list-packages.component';
// import {  HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { FaqComponent } from './pages/faq/faq.component';
import { TncComponent } from './pages/tnc/tnc.component';
import { AdminNavbarComponent } from './Auth/admin/admin-navbar/adminnavbar.component';
import { AgentControlComponent } from './Auth/admin/agent-control/agent-control.component';
import { PackageControlComponent } from './Auth/admin/package-control/package-control.component';
import { AdminProfileComponent } from './Auth/admin/admin-profile/admin-profile.component';
import { AdminlayoutComponent } from './Auth/admin/adminlayout/adminlayout.component';



import { HttpClientModule } from '@angular/common/http';

import { CardDetailComponent } from './Components/card-detail/card-detail.component';
import { AdminAgentComponent } from './Auth/admin/admin-agent/admin-agent.component';
import { AdminPackagesComponent } from './Auth/admin/admin-packages/admin-packages.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    FooterComponent,
    CardComponent,
    LoginComponent,
    SignupComponent,
    ListPackagesComponent,
    DashboardComponent,
    HomeComponent,
    PrivacyComponent,
    FaqComponent,
    TncComponent,
    AdminNavbarComponent,
    AgentControlComponent,
    PackageControlComponent,
    AdminProfileComponent,
    AdminlayoutComponent,
    CardDetailComponent,
    AdminAgentComponent,
    AdminPackagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
