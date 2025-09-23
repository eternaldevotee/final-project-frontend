import { TestBed } from '@angular/core/testing';

import { ShareloginService } from './sharelogin.service';

describe('ShareloginService', () => {
  let service: ShareloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
