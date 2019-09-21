import { TestBed } from '@angular/core/testing';

import { CredentialStateService } from './credential-state.service';

describe('CredentialStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CredentialStateService = TestBed.get(CredentialStateService);
    expect(service).toBeTruthy();
  });
});
