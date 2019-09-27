import { TestBed } from '@angular/core/testing';

import { MessagesActionService } from './messages-action.service';

describe('ActionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessagesActionService = TestBed.get(
      MessagesActionService
    );
    expect(service).toBeTruthy();
  });
});
