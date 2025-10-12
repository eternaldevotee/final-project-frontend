import { TestBed } from '@angular/core/testing';
import { AuthserviceService } from './authservice.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { UserModel } from '../../models/UserModel';

fdescribe('AuthserviceService', () => {
  let service: AuthserviceService;
  let httpMock: HttpTestingController;

  const mockUser: UserModel = {
    userID: '123',
    name: 'Stany',
    email: 'stany@example.com',
    password: 'Strong@123',
    role: 'customer',
    contactNumber: ''
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthserviceService]
    });

    service = TestBed.inject(AuthserviceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user by email ID', () => {
    service.getUserByEmailId('stany@example.com').subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:3000/User?Email=stany@example.com');
    expect(req.request.method).toBe('GET');
    req.flush([mockUser]); 
  });

  it('should post user details', () => {
    service.setUserDetails(mockUser).subscribe(response => {
      expect(response).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:3000/User');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush(mockUser);
  });

});