// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { LoginComponent } from './login.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { FormsModule, NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthserviceService } from '../../../../core/services/auth/authservice.service';
// import { ShareloginService } from '../../../../core/services/loginstate/sharelogin.service';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of } from 'rxjs';
// import { CustomerLoginStateService } from '../../../../core/services/loginstate/customer-login-state.service';

// fdescribe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let authService: AuthserviceService;
//   let shareLoginService: CustomerLoginStateService;
//   let router: Router;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [LoginComponent],
  
//       imports: [
//         HttpClientTestingModule, 
//         FormsModule,
//         RouterTestingModule.withRoutes([])               
//       ],
//       providers: [
//         AuthserviceService,
//         CustomerLoginStateService
//       ]

//     })
//     .compileComponents();


//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     authService = TestBed.inject(AuthserviceService);
//     shareLoginService = TestBed.inject(CustomerLoginStateService);
//     router = TestBed.inject(Router);
//     fixture.detectChanges();

//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
  
//   it('should initialize login object on ngOnInit', () => {
//     component.ngOnInit();
//     expect(component.login).toEqual({UserId:'',Name:'', Email: '', Password: '', ContactNumber:'',Role:'' });
//   });

//   it('should login successfully with correct credentials', () => {
//     const mockUser = {
//       UserId: 'U001',
//       Name: 'Stany',
//       Email: 'stany@example.com',
//       Password: 'pass1234',
//       Role: 'customer',
//       ContactNumber: '9876543210'
//     };

//     spyOn(authService, 'getUserByEmailId').and.returnValue(of(mockUser));
//     spyOn(shareLoginService, 'login');
//     spyOn(router, 'navigate');
//     spyOn(window, 'alert');

//     const mockForm = {
//       value: {
//         emailId: 'stany@example.com',
//         password: 'pass1234'
//       }
//     } as NgForm;

//     component.onSubmit(mockForm);

//     expect(authService.getUserByEmailId).toHaveBeenCalledWith('stany@example.com');
//     expect(component.userExists).toBeTrue();
//     expect(shareLoginService.login).toHaveBeenCalledWith('U001','customer');
//     expect(router.navigate).toHaveBeenCalledWith(['']);
//     expect(window.alert).toHaveBeenCalledWith('Logged in successfully!!');
//   });
//   it('should show alert for incorrect password', () => {
//     const mockUser = {
//       UserId: 'U001',
//       Name: 'Stany',
//       Email: 'stany@example.com',
//       Password: 'correctPass',
//       Role: 'customer',
//       ContactNumber: '9876543210'
//     };

//     spyOn(authService, 'getUserByEmailId').and.returnValue(of(mockUser));
//     spyOn(window, 'alert');

//     const mockForm = {
//       value: {
//         emailId: 'stany@example.com',
//         password: 'wrongPass'
//       }
//     } as NgForm;

//     component.onSubmit(mockForm);

//     expect(window.alert).toHaveBeenCalledWith('Incorrect password!!');
//   });
// });
