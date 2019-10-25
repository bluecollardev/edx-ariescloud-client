import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl;

export type APISegmentType =
  | 'proofs'
  | 'issues'
  | 'relationships'
  | 'invitations'
  | 'messages'
  | 'credentials'
  | 'credential-definitions';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = apiUrl;
  }

  get<T>(segment: APISegmentType) {
    return this.http.get<T>(`${this.url}`);
  }
}
