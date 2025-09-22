
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CardComponent } from './Components/card/card.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Auth/customer/login/login.component';
import { SignupComponent } from './Auth/customer/signup/signup.component';
import { AdminLoginComponent } from './Auth/admin/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListPackagesComponent } from './Components/list-packages/list-packages.component';
import {  HttpClientModule } from '@angular/common/http';
import { SearchpipePipe } from './Components/pipes/searchpipe.pipe';
import { NgModule } from '@angular/core';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionModule } from '@angular/material/expansion';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { FaqComponent } from './pages/faq/faq.component';
import { TncComponent } from './pages/tnc/tnc.component';
import { AdminNavbarComponent } from './Auth/admin/admin-navbar/adminnavbar.component';
import { AdminProfileComponent } from './Auth/admin/admin-profile/admin-profile.component';
import { AdminlayoutComponent } from './Auth/admin/adminlayout/adminlayout.component';
import { CardDetailComponent } from './Components/card-detail/card-detail.component';
import { AgentPackageDetailComponent } from './Components/agent-package-detail/agent-package-detail.component';
import { CustomerAuthModalComponent } from './Auth/customer/customer-auth-modal/customer-auth-modal.component';
import { BookingComponent } from './booking-module/booking/booking.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ViewSearchedPackagesComponent } from './view-searched-packages/view-searched-packages.component';
import { AgentNavbarComponent } from './Agent/agent-navbar/agent-navbar.component';




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
    SearchpipePipe,
    DashboardComponent,
    HomeComponent,
    PrivacyComponent,
    FaqComponent,
    TncComponent,
    AdminNavbarComponent,
    AdminProfileComponent,
    AdminlayoutComponent,
    CardDetailComponent,
    AgentPackageDetailComponent,

    AdminLoginComponent,
    CustomerAuthModalComponent,
    BookingComponent,
    SearchbarComponent,
    ViewSearchedPackagesComponent,
    AgentNavbarComponent
  ],
    
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatExpansionModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    RouterLink,
    RouterOutlet


    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
