import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAuthModalComponent } from './customer-auth-modal.component';

describe('CustomerAuthModalComponent', () => {
  let component: CustomerAuthModalComponent;
  let fixture: ComponentFixture<CustomerAuthModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerAuthModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAuthModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
