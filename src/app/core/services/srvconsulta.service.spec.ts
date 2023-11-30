import { TestBed } from '@angular/core/testing';

import { SrvconsultaService } from './srvconsulta.service';

describe('SrvconsultaService', () => {
  let service: SrvconsultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvconsultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
