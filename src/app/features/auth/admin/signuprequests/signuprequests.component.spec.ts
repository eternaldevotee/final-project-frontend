import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignuprequestsComponent } from './signuprequests.component';

describe('SinguprequestsComponent', () => {
  let component: SignuprequestsComponent;
  let fixture: ComponentFixture<SignuprequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignuprequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignuprequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
