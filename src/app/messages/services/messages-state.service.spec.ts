import { TestBed } from '@angular/core/testing';

import { MessagesStateService } from './messages-state.service';

describe('RelationshipsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessagesStateService = TestBed.get(MessagesStateService);
    expect(service).toBeTruthy();
  });
});
