import { TestBed } from '@angular/core/testing';

import { ChallanDetService } from './challan-det.service';

describe('ChallanDetService', () => {
  let service: ChallanDetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallanDetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
