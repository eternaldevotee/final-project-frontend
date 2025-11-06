import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlecustomersComponent } from './handlecustomers.component';

describe('HandlecustomersComponent', () => {
  let component: HandlecustomersComponent;
  let fixture: ComponentFixture<HandlecustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandlecustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandlecustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
