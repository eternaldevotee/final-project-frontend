import { TestBed } from '@angular/core/testing';

import { DynamicCardService } from '../Service/dynamic-card.service';

describe('DynamicCardService', () => {
  let service: DynamicCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
