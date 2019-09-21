import { TestBed } from '@angular/core/testing';

import { RelationshipsStateService } from './relationships-state.service';

describe('RelationshipsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelationshipsStateService = TestBed.get(RelationshipsStateService);
    expect(service).toBeTruthy();
  });
});
