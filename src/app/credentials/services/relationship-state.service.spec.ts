import { TestBed } from '@angular/core/testing';

import { RelationshipStateService } from './relationship-state.service';

describe('RelationshipsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelationshipStateService = TestBed.get(RelationshipStateService);
    expect(service).toBeTruthy();
  });

  it('should get relationships from the server', () => {
    const service: RelationshipStateService = TestBed.get(RelationshipStateService);

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
