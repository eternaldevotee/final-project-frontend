import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPackagesComponent } from './list-packages.component';
import { DynamicCardService } from '../../core/services/dynamic-card.service';
import { ShareloginService } from '../../core/services/loginstate/sharelogin.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TravelPackageModel } from '../../core/models/TravelPackageModel';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ListPackagesComponent', () => {
  let component: ListPackagesComponent;
  let fixture: ComponentFixture<ListPackagesComponent>;
  let mockCardService: jasmine.SpyObj<DynamicCardService>;
  let mockShareLoginService: jasmine.SpyObj<ShareloginService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockCardService = jasmine.createSpyObj('DynamicCardService', ['getPackagesByAdminId']);
    mockShareLoginService = jasmine.createSpyObj('ShareloginService', ['getUserId']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ListPackagesComponent],
      providers: [
        { provide: DynamicCardService, useValue: mockCardService },
        { provide: ShareloginService, useValue: mockShareLoginService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA] 
    }).compileComponents();

    fixture = TestBed.createComponent(ListPackagesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch packages on init', () => {
    const mockPackages: TravelPackageModel[] = [
      {
        packageID: 'pkg001',
        userID: 'admin123',
        title: 'Beach Escape',
        description: 'Relaxing beach trip',
        detailedDescription: 'Enjoy 5 days of sun and sand in Goa.',
        duration: '5 days',
        price: 15000,
        includedServices: ['Hotel', 'Breakfast', 'Airport Pickup'],
        imageSrc: '/assets/beach.jpg',
        location: 'Goa'
      },
      {
        packageID: 'pkg002',
        userID: 'admin123',
        title: 'Mountain Adventure',
        description: 'Thrilling trek in the Himalayas',
        detailedDescription: '7-day guided trek with camping and meals.',
        duration: '7 days',
        price: 22000,
        includedServices: ['Guide', 'Camping Gear', 'Meals'],
        imageSrc: '/assets/mountain.jpg',
        location: 'Manali'
      }
    ];

    mockShareLoginService.getUserId.and.returnValue('admin123');
    mockCardService.getPackagesByAdminId.and.returnValue(of(mockPackages));

    component.ngOnInit();

    expect(mockShareLoginService.getUserId).toHaveBeenCalled();
    expect(mockCardService.getPackagesByAdminId).toHaveBeenCalledWith('admin123');
    expect(component.packages).toEqual(mockPackages);
  });

  it('should navigate to the given path', () => {
    component.navigateTo('agent/create-package');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/agent/create-package']);
  });

  it('should show no packages message when packages array is empty', () => {
    component.packages = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.no-pkg-msg')?.textContent).toContain('You don’t have any active packages');
  });

  it('should render package cards when packages are available', () => {
    component.packages = [
      {
        packageID: 'pkg001',
        userID: 'admin123',
        title: 'Beach Escape',
        description: 'Relaxing beach trip',
        detailedDescription: 'Enjoy 5 days of sun and sand in Goa.',
        duration: '5 days',
        price: 15000,
        includedServices: ['Hotel', 'Breakfast', 'Airport Pickup'],
        imageSrc: '/assets/beach.jpg',
        location: 'Goa'
      }
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-title')?.textContent).toContain('Beach Escape');
    expect(compiled.querySelector('.card-text')?.textContent).toContain('Relaxing beach trip');
    expect(compiled.querySelector('img')?.getAttribute('src')).toBe('/assets/beach.jpg');
  });
});
