import { TestBed } from '@angular/core/testing';

import { VechileServiceService } from './vechile-service.service';

describe('VechileServiceService', () => {
  let service: VechileServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VechileServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
