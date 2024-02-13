import { TestBed } from '@angular/core/testing';

import { ExcelFileUploadService } from './excel-file-upload.service';

describe('ExcelFileUploadService', () => {
  let service: ExcelFileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelFileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
