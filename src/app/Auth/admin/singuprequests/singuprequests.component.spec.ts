import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinguprequestsComponent } from './singuprequests.component';

describe('SinguprequestsComponent', () => {
  let component: SinguprequestsComponent;
  let fixture: ComponentFixture<SinguprequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SinguprequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinguprequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
