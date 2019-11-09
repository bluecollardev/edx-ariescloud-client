import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import * as CredentialMocks from './credential-mocks';
import { ICredentialResponse } from '../components/credentials-received/credentials-received.component';

export interface ICredentialSchema {
  id: string; // Use GUID
  name: string;
  ownedBy: string;
  version: string;
  fields: object;
}

export interface ICredentialDef {
  _id: string; // Use GUID
  issuedBy: string;
  issuerDid: string;
  name: string;
  program: string;
  version: string;
  schema: string;
  attributes: string[];
}

export interface ICredential {
  _id: string; // Use GUID
  issuedBy: string;
  issuerDid: string;
  issuedTo: string;
  dateIssued: Date;
  name: string;
  type: string;
  program: string;
  state: string;
  version: string;
  schema: string;
  did: string;
  records: any[];
  connectionId: string;
  credential_exchange_id: string;
}

export interface ICertificateOfProof {
  connectionId: string; // Use GUID
  issuerDid: string;
  name: string;
  version: string;
  requested_attributes: object;
  requested_predicates: object;
  proofs: any[];
}

export interface IIssuer {
  name: string;
  type: string;
  did: string;
}

@Injectable({
  providedIn: 'root'
})
export class CredentialStateService {
  issuers$: Observable<IIssuer[]> = new Observable<IIssuer[]>();
  credentialSchemas$: Observable<ICredentialSchema[]> = new Observable<
    ICredentialSchema[]
  >();
  activeCredentialSchema$: Observable<ICredentialSchema[]> = new Observable<
    ICredentialSchema[]
  >();
  credentialDefs$: Observable<any[]>;
  activeCredentialDef$: Observable<ICredentialDef[]> = new Observable<
    ICredentialDef[]
  >();
  credentials$: Observable<ICredentialResponse[]>;
  activeCredential$: Observable<ICredential[]> = new Observable<
    ICredential[]
  >();
  certificatesOfProof$: Observable<ICertificateOfProof[]> = new Observable<
    ICertificateOfProof[]
  >();
  activeCertificateOfProof$: Observable<ICertificateOfProof[]> = new Observable<
    ICertificateOfProof[]
  >();

  pending$: Observable<any[]>;

  constructor() {
    /*const governmentCredential = {
      email: 'alice@faber.edu',
      name: 'Alice',
      tax_id: '123-45-6789'
    };*/
    // TODO: Remove these!
  }

  setCertificates(data: Observable<ICertificateOfProof[]>) {
    this.certificatesOfProof$ = data;
  }

  setActiveCredential(cid: string) {
    // this.activeCredential$ = this.credentials$.pipe(
    // map(cs => {
    // return cs.filter(c => {
    //   console.log('------------');
    //   console.log(c);
    //   console.log(c.id);
    //   console.log(cid);
    //   console.log('------------');
    //   return c.id === cid;
    // });
    // })
    // );
  }

  setCredentials(data: Observable<ICredential[]>) {
    // this.credentials$ = data;
  }

  setCredentialSchema(data: ICredential) {}

  setActiveCredentialSchema(cid: string) {
    this.activeCredentialSchema$ = this.credentialSchemas$.pipe(
      map(cs => {
        return cs.filter(c => {
          console.log('------------');
          console.log(c);
          console.log(c.id);
          console.log(cid);
          console.log('------------');
          return c.id === cid;
        });
      })
    );
  }

  setCredentialSchemas(data: Observable<ICredentialSchema[]>) {
    this.credentialSchemas$ = data;
  }

  setCredentialDef(data: ICredentialDef) {}

  setActiveCredentialDef(cid: string) {
    this.activeCredentialDef$ = this.credentialDefs$.pipe(
      map(cs => {
        return cs.filter(c => {
          console.log('------------');
          console.log(c);
          console.log(c._id);
          console.log(cid);
          console.log('------------');
          return c._id === cid;
        });
      })
    );
  }

  setCredentialDefs(data: Observable<ICredentialDef[]>) {
    this.credentialDefs$ = data;
  }

  buildIssuers(credentials: any[]) {
    const issuers = credentials
      .filter((cred, idx, arr) => {
        return arr.map(item => item.issuedBy).indexOf(cred.issuedBy) === idx;
      })
      .map(cred => ({
        name: cred.issuedBy,
        type: 'Organization',
        did: cred.issuerDid
      }));

    return issuers;
  }

  setIssuers(data: Observable<IIssuer[]>) {
    this.issuers$ = data;
  }
}
