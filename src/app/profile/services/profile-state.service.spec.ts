import { TestBed } from '@angular/core/testing';

import { ProfileStateService } from './profile-state.service';

describe('ProfileStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileStateService = TestBed.get(ProfileStateService);
    expect(service).toBeTruthy();
  });
});
