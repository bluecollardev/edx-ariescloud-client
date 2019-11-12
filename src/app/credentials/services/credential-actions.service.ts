import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from 'src/app/core/services/http.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import {
  CredentialStateService,
  ICredentialSchema,
  ICredentialDef,
  ICredential,
  ICertificateOfProof,
  IIssuer,
} from './credential-state.service';

import * as CredentialMocks from './credential-mocks';
import { ICredentialResponse } from '../components/credentials-received/credentials-received.component';
import { IIssueResponse } from '../models/i-issue';
import { IIssueFlat } from '../components/credentials-issued/credentials-issued.component';

export interface ICredDefDeleteResponse {
  ok: boolean;
}

const apiUrl = environment.apiUrl;

export interface ICredentialParams {
  did: string;
}

export interface ICertificateParams {
  did?: string;
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CredentialActionsService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  url: string;

  constructor(
    private http: HttpClient,
    private httpSvc: HttpService,
    private stateSvc: CredentialStateService,
  ) {
    this.url = apiUrl;
    console.log(apiUrl);
  }

  async submitCredDef(credDef: ICredentialDef) {
    // this is a stub for an http send service
    // console.log('cred def', credDef);
    console.log('the cred def', credDef);
    const res = await this.httpSvc
      .post('credential-definitions', {
        schema_name: credDef.name,
        schema_version: credDef.version,
        attributes: credDef.schema,
      })
      .toPromise();

    return res;
  }

  getCredential(id: string) {
    return this.httpSvc.getById<ICredentialDef>('credential-definitions', id);
  }

  getCredentials(params?: ICredentialParams) {
    const obs = this.httpSvc.get<ICredentialResponse[]>('credentials');

    return obs;
  }
  getFlatCredentials(params?: any) {
    const obs = this.httpSvc.get<IIssueFlat[]>('issues/flat');

    return obs;
  }

  createCredentialSchema() {
    this.http.post<ICredentialSchema[]>(`${this.url}credentials`, {
      headers: this.headers,
    });
  }

  getCredentialDef(id: string) {
    const response = this.httpSvc.getById<ICredentialDef>(
      'credential-definitions',
      id,
    );
    // this.stateSvc.setActiveCredentialDef(id);

    return response;
  }

  getPendingIssues() {
    return this.httpSvc.get<ICredential[]>('issues');
  }

  getCredentialDefs(params?: ICredentialParams) {
    const response = this.httpSvc.get<ICredentialDef[]>(
      'credential-definitions',
    );
    return response;
  }

  createCredentialDef() {
    this.http.post<ICredentialDef[]>(`${this.url}credentials`, {
      headers: this.headers,
    });
  }

  acceptCredential() {
    this.http.put<ICredentialDef[]>(`${this.url}credentials`, {
      headers: this.headers,
    });
  }

  async deleteCredDef(id: string) {
    try {
      return await this.httpSvc
        .delete('credential-definitions', id)
        .toPromise();
    } catch (err) {
      console.log(err);
    }
  }

  setRelState() {
    this.stateSvc.credentialDefs$ = this.getCredentialDefs();
  }
  getIssueById(id: string) {
    return this.httpSvc.getById<IIssueResponse>('issues', id);
  }
}
