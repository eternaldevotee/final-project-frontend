import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFormComponent } from './booking-form.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { ShareloginService } from '../../../core/services/loginstate/sharelogin.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingserviceService } from '../../../core/services/booking/bookingservice.service';

fdescribe('BookingFormComponent', () => {
  let component: BookingFormComponent;
  let fixture: ComponentFixture<BookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingFormComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ], // ✅ Provides HttpClient
      providers: [
        BookingserviceService,
        ShareloginService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1' // mock PackageID
              }
            }
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should initialize the form with default values', () => {
    expect(component.bookingForm).toBeDefined();
    expect(component.Adults?.value).toBe(1);
    expect(component.Children?.value).toBe(0);
  })
  it('should set minDate to tomorrow', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const expectedDate = tomorrow.toISOString().split('T')[0];
    expect(component.minDate).toBe(expectedDate);
  });

  it('should be invalid if date is empty', () => {
    component.bookingForm.controls['date'].setValue('');
    expect(component.bookingForm.valid).toBeFalse();
  });
  
  it('should be valid with correct inputs', () => {
    component.bookingForm.controls['date'].setValue('2025-10-01');
    component.bookingForm.controls['Adults'].setValue(2);
    component.bookingForm.controls['Children'].setValue(1);
    expect(component.bookingForm.valid).toBeTrue();
  });
});
