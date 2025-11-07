import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
  MatExpansionModule,
} from '@angular/material/expansion';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';

import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { CarouselComponent } from './shared/ui/carousel/carousel.component';
import { CardComponent } from './shared/ui/card/card.component';
import { FooterComponent } from './shared/ui/footer/footer.component';
import { ListPackagesComponent } from './features/list-packages/list-packages.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HomeComponent } from './features/home/home.component';
import { PrivacyComponent } from './shared/ui/footer-content/privacy/privacy.component';
import { FaqComponent } from './shared/ui/footer-content/faq/faq.component';
import { TncComponent } from './shared/ui/footer-content/tnc/tnc.component';
import { CardDetailComponent } from './shared/ui/card-detail/card-detail.component';
import { AgentPackageDetailComponent } from './features/agent-package-detail/agent-package-detail.component';
import { AgentControlComponent } from './features/auth/admin/agent-control/agent-control.component';
import { SearchbarComponent } from './features/search-module/searchbar/searchbar.component';
import { ViewSearchedPackagesComponent } from './features/search-module/view-searched-packages/view-searched-packages.component';
import { AgentNavbarComponent } from './shared/layout/agent-navbar/agent-navbar.component';
import { BookingFormComponent } from './features/booking-payment/booking-form/booking-form.component';
import { AdminLoginComponent } from './features/auth/admin/admin-login/admin-login.component';
import { AdminNavbarComponent } from './shared/layout/admin-navbar/adminnavbar.component';
import { LoginComponent } from './features/auth/customer/login/login.component';
import { SignupComponent } from './features/auth/customer/signup/signup.component';
import { AdminProfileComponent } from './features/auth/admin/admin-profile/admin-profile.component';
import { AdminlayoutComponent } from './features/auth/admin/adminlayout/adminlayout.component';
import { CurrentagentComponent } from './features/auth/admin/currentagent/currentagent.component';
import { SignupRequestsComponent } from './features/auth/admin/signuprequests/signuprequests.component';
import { AgentLoginComponent } from './features/auth/agent/agent-login/agent-login.component';
import { AgentSignupComponent } from './features/auth/agent/agent-signup/agent-signup.component';
import { AdminAgentComponent } from './features/auth/admin/admin-agent/admin-agent.component';
import { ReviewsModule } from './features/reviews-ratings/reviews.module';
import { StoreModule } from '@ngrx/store';
import { ViewMybookingsComponent } from './features/booking-payment/view-mybookings/view-mybookings.component';
import { PaymentSuccessComponent } from './features/booking-payment/payment-success/payment-success.component';
import { PaymentCancelledComponent } from './features/booking-payment/payment-cancelled/payment-cancelled.component';
import { AgentHomeComponent } from './shared/ui/agent-home/agent-home.component';
import { PaymentProcessingComponent } from './features/booking-payment/payment-processing/payment-processing.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaymentReceiptComponent } from './features/booking-payment/payment-receipt/payment-receipt.component';
import { BookingSummaryTableComponent } from './features/booking-summary-table/booking-summary-table.component';
import { MotivatorComponent } from './shared/ui/motivator/motivator.component';
import { OrderDetailsComponent } from './features/booking-payment/order-details/order-details.component';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { AgentNotificationsComponent } from './shared/ui/agent-notifications/agent-notifications.component';
import { AssistanceRequestComponent } from './features/auth/admin/assistance-request/assistance-request.component';
import { HandlecustomersComponent } from './features/auth/admin/handlecustomers/handlecustomers.component';
import { CustomerAssistanceComponent } from './features/customer-assistance/customer-assistance.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    CardComponent,
    FooterComponent,
    ListPackagesComponent,
    DashboardComponent,
    HomeComponent,
    PrivacyComponent,
    FaqComponent,
    TncComponent,
    CardDetailComponent,
    AgentPackageDetailComponent,
    AgentControlComponent,
    SearchbarComponent,
    ViewSearchedPackagesComponent,
    AgentNavbarComponent,
    BookingFormComponent,
    AdminLoginComponent,
    AdminNavbarComponent,
    LoginComponent,
    SignupComponent,
    AdminProfileComponent,
    AdminlayoutComponent,
    CurrentagentComponent,
    SignupRequestsComponent,
    AgentLoginComponent,
    AgentSignupComponent,
    AdminAgentComponent,
    ViewMybookingsComponent,
    PaymentSuccessComponent,
    PaymentCancelledComponent,
    AgentHomeComponent,
    PaymentProcessingComponent,
    PaymentReceiptComponent,
    BookingSummaryTableComponent,
    MotivatorComponent,
    OrderDetailsComponent,
    AgentNotificationsComponent,
    AssistanceRequestComponent,
    HandlecustomersComponent,
    CustomerAssistanceComponent
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatExpansionModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    RouterOutlet,
    RouterLink,
    RouterOutlet,
    ReactiveFormsModule,
    ReviewsModule,
    StoreModule.forRoot({}, {}),
    MatProgressSpinnerModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptor]))
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}