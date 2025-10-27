import { TestBed } from '@angular/core/testing';

import { ShowBookingsService } from './show-bookings.service';

describe('ShowBookingsService', () => {
  let service: ShowBookingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowBookingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
