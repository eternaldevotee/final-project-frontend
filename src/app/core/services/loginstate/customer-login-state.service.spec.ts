import { TestBed } from '@angular/core/testing';

import { CustomerLoginStateService } from './customer-login-state.service';

describe('CustomerLoginStateService', () => {
  let service: CustomerLoginStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerLoginStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
