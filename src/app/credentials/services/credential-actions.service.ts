import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from 'src/app/core/services/http.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { first, last, map, reduce, find, filter, skipWhile, single } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { CredentialStateService, ICredentialSchema, ICredentialDef, ICredential, ICertificateOfProof } from './credential-state.service';

import * as CredentialMocks from './credential-mocks';

const apiUrl = environment.apiUrl;

export interface ICredentialParams {
  did: string;
}

export interface ICertificateParams {
  did?: string;
  id?: string;
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

  getCredentialDef(id: string) {
    const response = this.http.get<ICredentialDef[]>(
      `${this.url}credentials/${id}`,
      { headers: this.headers }
    );

    this.stateSvc.setActiveCredentialDef(id);

    console.log('active credential');
    console.log(this.stateSvc.activeCredentialDef$);

    return this.stateSvc.activeCredentialDef$;
  }

  getCredentialDefs(params?: ICredentialParams) {
    const response = this.http.get<ICredentialDef[]>(
      `${this.url}credentials`,
      { headers: this.headers }
    );

    this.stateSvc.setCredentialDefs(of(CredentialMocks.credentialDefs));

    if (params && params.did) {
      return (this.stateSvc.credentialDefs$ = this.stateSvc.credentialDefs$.pipe(
        map(cs => {
          const filtered = cs.filter(c => c.issuerDid === params.did);
          console.log(filtered);
          return filtered;
        })
      ));
    }

    return this.stateSvc.credentials$;
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

  getCertificate(id: string) {
    const response = this.http.get<ICertificateOfProof[]>(
      `${this.url}credentials/${id}`,
      { headers: this.headers }
    );

    this.stateSvc.setActiveCertificate(id);

    console.log('active certificate');
    console.log(this.stateSvc.activeCertificateOfProof$);

    return this.stateSvc.activeCertificateOfProof$;
  }

  getCertificates(params?: ICertificateParams) {
    const response = this.http.get<ICertificateOfProof[]>(
      `${this.url}credentials`,
      { headers: this.headers }
    );

    this.stateSvc.setCertificates(of(CredentialMocks.certificatesOfProof));

    if (params && params.did) {
      return (this.stateSvc.certificatesOfProof$ = this.stateSvc.certificatesOfProof$.pipe(
        map(cs => {
          const filtered = cs.filter(c => c.issuerDid === params.did);
          console.log(filtered);
          return filtered;
        })
      ));
    }

    return this.stateSvc.certificatesOfProof$;
  }
}
