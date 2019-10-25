import { TestBed } from '@angular/core/testing';

import { MessagesActionService } from './messages-action.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from 'src/app/core/services/http.service';
import { MessagesStateService } from './messages-state.service';

describe('ActionsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpService, MessagesStateService]
    })
  );

  it('should be created', () => {
    const service: MessagesActionService = TestBed.get(MessagesActionService);
    expect(service).toBeTruthy();
  });
});
