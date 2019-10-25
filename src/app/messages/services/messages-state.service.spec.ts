import { TestBed } from '@angular/core/testing';

import { MessagesStateService } from './messages-state.service';
import { HttpClient } from '@angular/common/http';

describe('RelationshipsStateService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpClient]
    })
  );

  it('should be created', () => {
    const service: MessagesStateService = TestBed.get(MessagesStateService);
    expect(service).toBeTruthy();
  });
});
