import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAgentComponent } from './review-agent.component';

describe('ReviewAgentComponent', () => {
  let component: ReviewAgentComponent;
  let fixture: ComponentFixture<ReviewAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewAgentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
