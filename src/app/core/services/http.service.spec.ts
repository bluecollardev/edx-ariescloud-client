import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';

describe('HttpService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      // providers: httpc
    })
  );

  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });

  it('should get a list of connections', () => {});
});
