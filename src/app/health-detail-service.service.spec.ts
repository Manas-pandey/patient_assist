import { TestBed } from '@angular/core/testing';

import { HealthDetailServiceService } from './health-detail-service.service';

describe('HealthDetailServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HealthDetailServiceService = TestBed.get(HealthDetailServiceService);
    expect(service).toBeTruthy();
  });
});
