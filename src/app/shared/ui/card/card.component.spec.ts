import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { DynamicCardService } from '../../../core/services/dynamic-card.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { TravelPackageModel } from '../../../core/models/TravelPackageModel';
import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let mockService: jasmine.SpyObj<DynamicCardService>;

  const mockPackages: TravelPackageModel[] = [
    {
      packageID: '1',
      userID: 'U123',
      title: 'Beach Paradise',
      description: 'Enjoy the sunny beaches and crystal clear waters.',
      detailedDescription: 'Full itinerary with snorkeling and spa.',
      duration: '5 days',
      price: 15000,
      includedServices: ['Hotel', 'Meals', 'Guide'],
      imageSrc: 'beach.jpg',
      location: 'Goa'
    },
    {
      packageID: '3',
      userID: 'U456',
      title: 'Desert Safari Escape',
      description: 'Thrilling desert adventure with dune bashing and cultural experiences.',
      detailedDescription: 'Experience the golden sands of Rajasthan with camel rides, traditional music, and local cuisine.',
      duration: '3 days',
      price: 9800,
      includedServices: ['Camel Ride', 'Cultural Show', 'Dinner', 'Tent Stay'],
      imageSrc: 'desert.jpg',
      location: 'Jaisalmer, Rajasthan'
    }
  ];

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('DynamicCardService', ['getPackages']);
    mockService.getPackages.and.returnValue(of(mockPackages));

    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: DynamicCardService, useValue: mockService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPackages and populate packages', () => {
    expect(mockService.getPackages).toHaveBeenCalled();
    expect(component.packages.length).toBe(2);
    expect(component.packages[0].title).toBe('Beach Paradise');
    expect(component.packages[1].location).toBe('Jaisalmer, Rajasthan');
  });

  it('should render package cards in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cardTitles = compiled.querySelectorAll('.card-title');
    expect(cardTitles.length).toBe(2);
    expect(cardTitles[0].textContent).toContain('Beach Paradise');
    expect(cardTitles[1].textContent).toContain('Desert Safari Escape');
  });
});
