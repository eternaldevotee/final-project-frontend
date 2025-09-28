import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentagentComponent } from './currentagent.component';

describe('CurrentagentComponent', () => {
  let component: CurrentagentComponent;
  let fixture: ComponentFixture<CurrentagentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentagentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
