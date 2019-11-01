import { TestBed } from '@angular/core/testing';

import { RelationshipActionsService } from './relationship-actions.service';
import { HttpClientModule } from '@angular/common/http';

describe('ActionsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
  );

  it('should be created', () => {
    const service: RelationshipActionsService = TestBed.get(
      RelationshipActionsService
    );
    expect(service).toBeTruthy();
  });

  it('should be able to get relationships', () => {
    const service: RelationshipActionsService = TestBed.get(
      RelationshipActionsService
    );

    const relationships = service.getRelationships();

    expect(service).toBeTruthy();
  });
});
