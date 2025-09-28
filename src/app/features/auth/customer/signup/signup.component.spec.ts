import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthserviceService } from '../../../../core/services/auth/authservice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';



fdescribe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have an invalid form when empty', () => {
    component.signupForm.setValue({
      name: '',
      emailId: '',
      password: '',
      conPassword: ''
    });
    expect(component.signupForm.valid).toBeFalsy();
  });

  
  it('should validate email format', () => {
      const email = component.emailId;
      email?.setValue('invalidemail');
      expect(email?.valid).toBeFalsy();

      email?.setValue('user@example.com');
      expect(email?.valid).toBeTruthy();
    });

    
    it('should validate password pattern', () => {
      const password = component.password;
      password?.setValue('pass');
      expect(password?.valid).toBeFalsy();

      password?.setValue('Strong@123');
      expect(password?.valid).toBeTruthy();
    });


    it('should check if password and confirm password match', () => {
      component.signupForm.setValue({
        name: 'Stany',
        emailId: 'stany@example.com',
        password: 'Strong@123',
        conPassword: 'Strong@123'
      });
      expect(component.signupForm.valid).toBeTruthy();
    });
});
