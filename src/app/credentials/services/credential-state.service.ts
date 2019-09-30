import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { first, last, map, reduce, find, filter, skipWhile, single } from 'rxjs/operators';

import * as CredentialMocks from './credential-mocks';

export interface ICredentialSchema {
  id: string; // Use GUID
  name: string;
  ownedBy: string;
  version: string;
  fields: object;
}

export interface ICredentialDef {
  id: string; // Use GUID
  issuedBy: string;
  issuerDid: string;
  name: string;
  program: string;
  version: string;
  schema: string;
}

export interface ICredential {
  id: string; // Use GUID
  issuedBy: string;
  issuerDid: string;
  issuedTo: string;
  dateIssued: Date;
  name: string;
  type: string;
  program: string;
  status: string;
  version: string;
  schema: string;
}

export interface ICredentialProof {
  id: string; // Use GUID
  name: string;
  version: string;
  requested_attributes: object;
  requested_predicated: object;
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
  proofs$: Observable<any[]> = new Observable<any[]>();

  credentialSchemas$: Observable<ICredentialSchema[]> = new Observable<ICredentialSchema[]>();
  activeCredentialSchema$: Observable<ICredentialSchema[]> = new Observable<ICredentialSchema[]>();
  credentialDefs$: Observable<ICredentialDef[]> = new Observable<ICredentialDef[]>();
  activeCredentialDef$: Observable<ICredentialDef[]> = new Observable<ICredentialDef[]>();
  credentials$: Observable<ICredential[]> = new Observable<ICredential[]>();
  activeCredential$: Observable<ICredential[]> = new Observable<ICredential[]>();
  activeCredentialProofs$: Observable<ICredentialProof[]> = new Observable<ICredentialProof[]>();

  private _ready$ = new BehaviorSubject<boolean>(false);
  ready = this._ready$.asObservable();

  constructor() {
    /*const governmentCredential = {
      email: 'alice@faber.edu',
      name: 'Alice',
      tax_id: '123-45-6789'
    };*/

    // TODO: Remove these!
    // this.setActiveCredentialProofs(did, of(credentialProofs));
    // this.setCredentials(of(credentials));
    this.setIssuers(of(this.buildIssuers(CredentialMocks.issuedCredentials)));
    // this.setCredentialSchemas(of(credentialSchemas));
    this.setCredentialDefs(of(CredentialMocks.credentialDefs));

    this.setReady(true);
  }

  setReady(bool: boolean) {
    this._ready$.next(bool);
  }

  setProofs(data: any[]) {
    this.proofs$ = of(data);
  }

  setCredential(data: ICredential) {


  }

  setActiveCredential(cid: string) {
    this.activeCredential$ = this.credentials$.pipe(
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

  setCredentials(data: Observable<ICredential[]>) {
    this.credentials$ = data;
  }

  setActiveCredentialProofs(cid: string, data: Observable<ICredentialProof[]>) {
    this.activeCredentialProofs$ = data;
  }

  setCredentialSchema(data: ICredential) {

  }

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

  setCredentialDef(data: ICredentialDef) {


  }

  setActiveCredentialDef(cid: string) {
    this.activeCredentialDef$ = this.credentialDefs$.pipe(
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

  setCredentialDefs(data: Observable<ICredentialDef[]>) {
    this.credentialDefs$ = data;
  }

  buildIssuers(credentials: any[]) {
    const issuers = credentials.filter((cred, idx, arr) => {
      return arr
        .map((item) => item.issuedBy)
        .indexOf(cred.issuedBy) === idx;
    })
    .map((cred) => ({
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
