import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from 'src/app/core/services/http.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { first, last, map, reduce, find, filter, skipWhile, single } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { CredentialStateService, ICredentialSchema, ICredentialDef, ICredential, ICredentialProof } from './credential-state.service';

import * as CredentialMocks from './credential-mocks';

const apiUrl = environment.apiUrl;

export interface ICredentialParams {
  did: string;
}

@Injectable({
  providedIn: 'root'
})
export class CredentialActionsService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  url: string;

  constructor(
    private http: HttpClient,
    private httpSvc: HttpService,
    private stateSvc: CredentialStateService
  ) {
    this.url = apiUrl;
    console.log(apiUrl);
  }

  submitCredDef(credDef: ICredentialDef) {
    // this is a stub for an http send service
    console.log('cred def', credDef);
  }

  async loadCredDefs() {
    const response = {
      status: 200,
      data: []
    };

    const data = of(response.data);
    this.stateSvc.setCredentials(data);

    return this.stateSvc.credentials$;
  }

  async loadCredProofs() {
    const response = {
      status: 200,
      data: []
    };

    const data = response.data;
    this.stateSvc.setProofs(data);
  }

  getCredential(id: string) {
    const response = this.http.get<ICredential[]>(
      `${this.url}credentials/${id}`,
      { headers: this.headers }
    );

    this.stateSvc.setActiveCredential(id);

    console.log('active credential');
    console.log(this.stateSvc.activeCredential$);

    return this.stateSvc.activeCredential$;
  }

  getCredentials(params?: ICredentialParams) {
    const response = this.http.get<ICredential[]>(
      `${this.url}credentials`,
      { headers: this.headers }
    );

    this.stateSvc.setCredentials(of(CredentialMocks.issuedCredentials));

    if (params && params.did) {
      return (this.stateSvc.credentials$ = this.stateSvc.credentials$.pipe(
        map(cs => {
          const filtered = cs.filter(c => c.issuerDid === params.did);
          console.log(filtered);
          return filtered;
        })
      ));
    }

    return this.stateSvc.credentials$;
  }

  createCredentialSchema() {
    this.http.post<ICredentialSchema[]>(
      `${this.url}credentials`,
      {
        headers: this.headers
      }
    );
  }

  getCredentialSchema(id: string) {
    const credential = this.http.get<ICredentialSchema[]>(
      `${this.url}credentials/${id}`,
      { headers: this.headers }
    );

    this.stateSvc.setActiveCredentialSchema(id);

    console.log('active credential');
    console.log(this.stateSvc.activeCredential$);

    return this.stateSvc.activeCredential$;
  }

  createCredentialDef() {
    this.http.post<ICredentialDef[]>(
      `${this.url}credentials`,
      {
        headers: this.headers
      }
    );
  }

  acceptCredential() {
    this.http.put<ICredentialDef[]>(
      `${this.url}credentials`,
      {
        headers: this.headers
      }
    );
  }
}
