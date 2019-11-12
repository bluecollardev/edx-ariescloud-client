import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl;

export interface IMessage {
  _id: string;
  state: string;
  connectionId: string;
  initiator: string;
}

export interface IMessageResult {
  proofs: IMessage[];
  connections: IMessage[];
  issues: IMessage[];
}

export type APISegmentType =
  | 'proofs'
  | 'proofs/presentation/attributes'
  | 'issues'
  | 'relationships'
  | 'invitations'
  | 'messages'
  | 'credentials'
  | 'credential-definitions'
  | 'profile'
  | 'proofs/creds'
  | 'issues/flat';

export interface IInvitationResult {
  '@type': string;
  '@id': string;
  recipientKeys: string[];
  serviceEndpoint: string;
  label: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = apiUrl;
  }

  get<T>(segment: APISegmentType) {
    return this.http.get<T>(`${this.url}${segment}`);
  }

  getWithParam<T>(segment: APISegmentType, params: any) {
    return this.http.get<T>(`${this.url}${segment}`, params);
  }

  post<T>(segment: APISegmentType, params = {}) {
    return this.http.post<T>(`${this.url}${segment}`, params);
  }

  postById<T>(segment: APISegmentType, id: string, params = {}) {
    console.log(`${this.url}${segment}/${id}`);
    return this.http.post<T>(`${this.url}${segment}/${id}`, params);
  }

  getById<T>(segment: APISegmentType, id: string, params = {}) {
    console.log(`${this.url}${segment}/${id}`);
    return this.http.get<T>(`${this.url}${segment}/${id}`);
  }

  delete<T>(segment: APISegmentType, id: string) {
    return this.http.delete<T>(`${this.url}${segment}/${id}`);
  }
}
