import { TestBed } from '@angular/core/testing';

import { ExamserviceService } from './examservice.service';

describe('ExamserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamserviceService = TestBed.get(ExamserviceService);
    expect(service).toBeTruthy();
  });
});
