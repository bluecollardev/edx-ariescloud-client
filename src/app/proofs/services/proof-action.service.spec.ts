import { TestBed } from '@angular/core/testing';

import { ProofActionService } from './proof-action.service';

describe('ProofActionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProofActionService = TestBed.get(ProofActionService);
    expect(service).toBeTruthy();
  });
});
