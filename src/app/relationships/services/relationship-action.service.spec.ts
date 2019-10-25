import { TestBed } from '@angular/core/testing';

import { RelationshipsActionService } from './relationships-action.service';
import { HttpClientModule } from '@angular/common/http';

describe('ActionsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
  );

  it('should be created', () => {
    const service: RelationshipsActionService = TestBed.get(
      RelationshipsActionService
    );
    expect(service).toBeTruthy();
  });

  it('should be able to get relationships', () => {
    const service: RelationshipsActionService = TestBed.get(
      RelationshipsActionService
    );

    const relationships = service.getRelationships();

    expect(service).toBeTruthy();
  });
});
