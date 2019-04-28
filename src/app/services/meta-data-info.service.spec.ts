import { TestBed, inject } from '@angular/core/testing';

import { MetaDataInfoService } from './meta-data-info.service';

describe('MetaDataInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetaDataInfoService]
    });
  });

  it('should be created', inject([MetaDataInfoService], (service: MetaDataInfoService) => {
    expect(service).toBeTruthy();
  }));
});
