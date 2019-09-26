import { TestBed } from '@angular/core/testing';

import { CredentialReceivedStateService } from './credential-received-state.service';

describe('CredentialReceivedStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CredentialReceivedStateService = TestBed.get(CredentialReceivedStateService);
    expect(service).toBeTruthy();
  });
});
