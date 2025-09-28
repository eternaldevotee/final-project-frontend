import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMybookingsComponent } from './view-mybookings.component';

describe('ViewMybookingsComponent', () => {
  let component: ViewMybookingsComponent;
  let fixture: ComponentFixture<ViewMybookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewMybookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMybookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
