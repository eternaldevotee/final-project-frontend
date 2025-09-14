import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageControlComponent } from './package-control.component';

describe('PackageControlComponent', () => {
  let component: PackageControlComponent;
  let fixture: ComponentFixture<PackageControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackageControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
