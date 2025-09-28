import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSearchedPackagesComponent } from './view-searched-packages.component';

describe('ViewSearchedPackagesComponent', () => {
  let component: ViewSearchedPackagesComponent;
  let fixture: ComponentFixture<ViewSearchedPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSearchedPackagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSearchedPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
