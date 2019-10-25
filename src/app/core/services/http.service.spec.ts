import { TestBed } from '@angular/core/testing';

import { HttpService, IMessageResult } from './http.service';
import { HttpClientModule } from '@angular/common/http';

describe('HttpService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
  );

  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });

  it('should get a list of messages', async () => {
    const service: HttpService = TestBed.get(HttpService);
    const messages = await service.get('messages').toPromise();
    console.log(messages);
  });

  it('should get a list of connections', async () => {
    const service: HttpService = TestBed.get(HttpService);
    const messages = await service.get<IMessageResult>('proofs').toPromise();
    expect(messages).toBeTruthy();
    expect(messages).toBeDefined();
  });

  it('should get a list of connections', async () => {
    const service: HttpService = TestBed.get(HttpService);
    const messages = await service.get('relationships').toPromise();
  });

  it('should get a list of connections', async () => {
    const service: HttpService = TestBed.get(HttpService);
    const messages = await service.get('invitations').toPromise();
    // console.log(messages);
  });
});
