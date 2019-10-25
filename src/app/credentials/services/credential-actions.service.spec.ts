import { TestBed } from '@angular/core/testing';

import { CredentialActionsService } from './credential-actions.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('CredentialActionsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
  );

  it('should be created', () => {
    const service: CredentialActionsService = TestBed.get(
      CredentialActionsService
    );
    expect(service).toBeTruthy();
  });
});
