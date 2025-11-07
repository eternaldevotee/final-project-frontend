import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAssistanceComponent } from './customer-assistance.component';

describe('CustomerAssistanceComponent', () => {
  let component: CustomerAssistanceComponent;
  let fixture: ComponentFixture<CustomerAssistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerAssistanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
