import { TestBed } from '@angular/core/testing';

import { RelationshipsStateService } from './relationships-state.service';

describe('RelationshipsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelationshipsStateService = TestBed.get(RelationshipsStateService);
    expect(service).toBeTruthy();
  });

  it('should get relationships from the server', () => {
    const service: RelationshipsStateService = TestBed.get(RelationshipsStateService);

    // Call the API
    /*service.setRelationship({
      name: 'Acme',
      type: 'bar',
      received: new Date(),
      did: 'adslfj-1234-cxv324-asfxdf',
      publicDid: 'NEBWptNanb25KNRmogbPZ3'
    });*/
  });
});
