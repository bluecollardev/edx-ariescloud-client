import { TestBed } from '@angular/core/testing';

import { CredentialActionsService } from './credential-actions.service';

describe('CredentialActionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CredentialActionsService = TestBed.get(CredentialActionsService);
    expect(service).toBeTruthy();
  });
});
