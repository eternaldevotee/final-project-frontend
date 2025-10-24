import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSummaryTableComponent } from './booking-summary-table.component';

describe('BookingSummaryTableComponent', () => {
  let component: BookingSummaryTableComponent;
  let fixture: ComponentFixture<BookingSummaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingSummaryTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
