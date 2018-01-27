import { TestBed, inject } from '@angular/core/testing';

import { ProviderDataService } from './provider-data.service';

describe('ProviderDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProviderDataService]
    });
  });

  it('should be created', inject([ProviderDataService], (service: ProviderDataService) => {
    expect(service).toBeTruthy();
  }));
});
