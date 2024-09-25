import { TestBed } from '@angular/core/testing';

import { BonificoService } from './bonifico.service';

describe('BonificoService', () => {
  let service: BonificoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonificoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
