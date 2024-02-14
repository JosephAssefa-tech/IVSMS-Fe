import { TestBed } from '@angular/core/testing';

import { VechileManufactureService } from './vechile-manufacture.service';

describe('VechileManufactureService', () => {
  let service: VechileManufactureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VechileManufactureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
