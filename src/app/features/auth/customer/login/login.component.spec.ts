import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../../../core/services/auth/authservice.service';
import { ShareloginService } from '../../../../core/services/sharelogin.service';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
  
      imports: [
        HttpClientTestingModule, 
        FormsModule,
        RouterTestingModule.withRoutes([])               
      ],
      providers: [
        AuthserviceService,
        ShareloginService,
      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize login object on ngOnInit', () => {
    component.ngOnInit();
    expect(component.login).toEqual({UserId:'',Name:'', Email: '', Password: '', ContactNumber:'',Role:'' });
  });


});
