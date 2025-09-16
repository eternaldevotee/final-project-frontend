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
import {  HttpClientModule } from '@angular/common/http';
import { SearchpipePipe } from './Components/pipes/searchpipe.pipe';




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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
