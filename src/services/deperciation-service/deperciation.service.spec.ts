import { TestBed } from '@angular/core/testing';

import { DeperciationService } from './deperciation.service';

describe('DeperciationService', () => {
  let service: DeperciationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeperciationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
