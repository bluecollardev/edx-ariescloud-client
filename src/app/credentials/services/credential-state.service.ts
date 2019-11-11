import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import * as CredentialMocks from './credential-mocks';

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
  credentials: any[];
}

export interface ICertificateOfProof {
  id: string; // Use GUID
  issuerDid: string;
  name: string;
  version: string;
  requested_attributes: object;
  requested_predicates: object;
  connectionId: string;
}

export type ProofStateType =
  | 'proposal_sent'
  | 'proposal_received'
  | 'request_sent'
  | 'request_received'
  | 'presentation_sent'
  | 'presentation_received'
  | 'verified';

export interface IProofResponse {
  label: string;
  did: string;
  connectionId: string;
  proofs: IProof[];
  proofCount: number;
}

export interface IRequested {
  name: 'score';
  restrictions: {
    schema_name: 'testcred';
    schema_version: '1.0';
  };
}

export interface IProof {
  _id: string;
  updated: string;
  created: string;
  state: ProofStateType;
  connectionId: string;
  requested: IRequested[];
  presentation_request: {
    requested_attributes: any;
    /* {
        [key: string]: {
            "name":
            "restrictions": {
                "schema_name":
                "schema_version":
            }
        }
    },
    "requested_predicates": {},
    "name":
    "nonce":
    */
  };
  auto_present: boolean;
  initiator: 'self' | 'external';
  updated_at: string;
  presentation_exchange_id: string;
  thread_id: string;
  role: 'verifier' | 'prover';
  created_at: string;
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
  credentialDefs$: Observable<ICredentialDef[]>;
  activeCredentialDef$: Observable<ICredentialDef[]> = new Observable<
    ICredentialDef[]
  >();
  credentials$: Observable<ICredential[]>;
  activeCredential$: Observable<ICredential[]> = new Observable<
    ICredential[]
  >();
  certificatesOfProof$: Observable<ICertificateOfProof[]> = new Observable<
    ICertificateOfProof[]
  >();
  activeCertificateOfProof$: Observable<ICertificateOfProof[]> = new Observable<
    ICertificateOfProof[]
  >();

  pending$: Observable<ICredential[]>;

  constructor() {
    /*const governmentCredential = {
      email: 'alice@faber.edu',
      name: 'Alice',
      tax_id: '123-45-6789'
    };*/

    // TODO: Remove these!
    // this.setActiveCredentialProofs(did, of(certificatesOfProof));
    // this.setCredentials(of(credentials));
    this.setIssuers(of(this.buildIssuers(CredentialMocks.issuedCredentials)));
    // this.setCredentialSchemas(of(credentialSchemas));
    // this.setCredentialDefs(of(CredentialMocks.credentialDefs));
    this.setCertificates(of(CredentialMocks.certificatesOfProof));
  }

  setActiveCertificate(cid: string) {
    // this.activeCertificateOfProof$ = this.certificatesOfProof$.pipe(
    //   map(cs => {
    //     return cs.filter(c => {
    //       console.log('------------');
    //       console.log(c);
    //       console.log(c.id);
    //       console.log(cid);
    //       console.log('------------');
    //       return c.id === cid;
    //     });
    //   })
    // );
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
