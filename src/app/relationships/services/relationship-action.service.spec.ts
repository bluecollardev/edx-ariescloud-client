import { TestBed } from '@angular/core/testing';

import { RelationshipsActionService } from './relationships-action.service';

describe('ActionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelationshipsActionService = TestBed.get(
      RelationshipsActionService
    );
    expect(service).toBeTruthy();
  });
});
