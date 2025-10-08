import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarComponent } from './searchbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { SearchserviceService } from '../../../core/services/search/searchservice.service';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../../app-routing.module';
import { HomeComponent } from '../../home/home.component';
import { ViewSearchedPackagesComponent } from '../view-searched-packages/view-searched-packages.component';
import { ShareloginService } from '../../../core/services/loginstate/sharelogin.service';
import { AuthserviceService } from '../../../core/services/auth/authservice.service';

fdescribe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;




  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchbarComponent,HomeComponent,ViewSearchedPackagesComponent],
      imports:[
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should filter results based on input', () => {
    component.allPlaces = ['Paris', 'Pondicherry', 'Panaji', 'Delhi'];
    component.searchTerm = 'Pa';
    component.onInputChange();
    expect(component.filteredResults).toEqual(['Paris', 'Panaji']);
  });


  it('should set searchTerm and clear filteredResults on selectPlace()', () => {
    component.filteredResults = ['Paris', 'Pondicherry'];
    component.selectPlace('Paris');
    expect(component.searchTerm).toBe('Paris');
    expect(component.filteredResults.length).toBe(0);
  });

  it('should navigate to search results on onSearch()', () => {

    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.searchTerm = 'Goa';
    component.onSearch();
    expect(router.navigate).toHaveBeenCalledWith(
      ['home/viewsearch/', 'Goa'],
      { fragment: 'router-view' }
    );

  });


});
