import { TestBed } from '@angular/core/testing';

import { ProofStateService } from './proof-state.service';

describe('CredentialStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProofStateService = TestBed.get(ProofStateService);
    expect(service).toBeTruthy();
  });
});
