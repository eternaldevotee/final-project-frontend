import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPackageDetailComponent } from './agent-package-detail.component';

describe('AgentPackageDetailComponent', () => {
  let component: AgentPackageDetailComponent;
  let fixture: ComponentFixture<AgentPackageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentPackageDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentPackageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
