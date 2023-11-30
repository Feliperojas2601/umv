import { TestBed } from '@angular/core/testing';

import { SrvauthService } from './srvauth.service';

describe('SrvauthService', () => {
  let service: SrvauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
