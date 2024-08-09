import { TestBed } from '@angular/core/testing';

import { StroopServiceService } from './stroop-service.service';

describe('StroopServiceService', () => {
  let service: StroopServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StroopServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
