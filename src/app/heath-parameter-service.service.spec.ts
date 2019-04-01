import { TestBed } from '@angular/core/testing';

import { HeathParameterServiceService } from './heath-parameter-service.service';

describe('HeathParameterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeathParameterServiceService = TestBed.get(HeathParameterServiceService);
    expect(service).toBeTruthy();
  });
});
