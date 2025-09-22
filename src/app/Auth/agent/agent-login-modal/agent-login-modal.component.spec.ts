import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentLoginModalComponent } from './agent-login-modal.component';

describe('AgentLoginModalComponent', () => {
  let component: AgentLoginModalComponent;
  let fixture: ComponentFixture<AgentLoginModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentLoginModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentLoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
