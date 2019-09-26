import { TestBed } from '@angular/core/testing';

import { ProfileActionsService } from './profile-actions.service';

describe('ProfileActionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileActionsService = TestBed.get(ProfileActionsService);
    expect(service).toBeTruthy();
  });
});
