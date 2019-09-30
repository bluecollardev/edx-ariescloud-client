import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { first, last, map, reduce, find, filter, skipWhile, single } from 'rxjs/operators';

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
  name: string;
  program: string;
  version: string;
  schema: string;
}

export interface ICredential {
  id: string; // Use GUID
  issuedBy: string;
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
    const credentialSchemas = [
      {
        id: 'university-degree',
        ownedBy: 'Faber University',
        name: 'University Degree',
        version: '1.2',
        fields: {
          name: 'string',
          program: 'program'
        }
      },
      {
        id: 'course',
        ownedBy: 'Faber University',
        name: 'Single Course',
        version: '1.2',
        fields: {
          name: 'string',
          program: 'program'
        }
      }
    ];

    const credentialDefs = [
      {
        id: 'fbu-bsc-cs',
        issuedBy: 'Faber University',
        name: 'Bachelor\'s of Science Degree',
        program: 'Computer Science',
        version: '1.2',
        schema: 'university-degree'
      },
      {
        id: 'fbu-bsc-mb',
        issuedBy: 'Faber University',
        name: 'Bachelor\'s of Science Degree',
        program: 'Microbiology',
        version: '1.2',
        schema: 'university-degree'
      },
      {
        id: 'fbu-mba-biz',
        issuedBy: 'Faber University',
        name: 'Master\'s of Business Administration',
        program: 'Business',
        version: '1.2',
        schema: 'university-degree'
      },
      {
        id: 'fbu-cert-ac',
        issuedBy: 'Faber University',
        name: 'Certificate of Course Completion',
        program: 'Agile Coaching',
        version: '1.2',
        schema: 'course'
      }
    ];

    const credentials = [
      {
        id: 'xyz-123',
        issuedBy: 'Faber University',
        issuedTo: 'Alice Cooper',
        dateIssued: new Date(),
        name: 'Bachelor\'s of Science Degree',
        type: 'University Degree',
        program: 'Computer Science',
        status: 'Graduated',
        version: '1.2',
        schema: 'university-degree'
      },
      {
        id: 'xyz-124',
        issuedBy: 'Faber University',
        issuedTo: 'Alice Cooper',
        dateIssued: new Date(),
        name: 'Bachelor\'s of Science Degree',
        type: 'University Degree',
        program: 'Microbiology',
        status: 'Graduated',
        version: '1.2',
        schema: 'university-degree'
      },
      {
        id: 'xyz-127',
        issuedBy: 'Faber University',
        issuedTo: 'Alice Cooper',
        dateIssued: new Date(),
        name: 'Master\'s of Business Administration',
        type: 'University Degree',
        program: 'Business',
        status: 'Graduated',
        version: '1.2',
        schema: 'university-degree'
      },
      {
        id: 'xyz-132',
        issuedBy: 'Faber University',
        issuedTo: 'Alice Cooper',
        dateIssued: new Date(),
        name: 'Certificate of Course Completion',
        type: 'University Degree',
        program: 'Agile Coaching',
        status: 'Graduated',
        version: '1.2',
        schema: 'random-course'
      }
    ];

    const credentialProofs = [
      {
        id: 'abc-123',
        name: 'Bachelor\'s of Science Degree',
        version: '1.2',
        requested_attributes: {
          attr1_referents: {
            name: 'ipsum',
            restrictions: [{}]
          }
        },
        requested_predicates: []
      },
      {
        id: 'abc-124',
        name: 'Bachelor\'s of Science Degree',
        version: '1.2',
        requested_attributes: {
          attr1_referents: {
            name: 'ipsum',
            restrictions: [{}]
          }
        },
        requested_predicates: []
      },
      {
        id: 'abc-125',
        name: 'Bachelor\'s of Science Degree',
        version: '1.2',
        requested_attributes: {
          attr1_referents: {
            name: 'ipsum',
            restrictions: [{}]
          }
        },
        requested_predicates: []
      }
    ];

    /*const governmentCredential = {
      email: 'alice@faber.edu',
      name: 'Alice',
      tax_id: '123-45-6789'
    };*/

    // this.setActiveCredentialProofs(proofs);
    this.setCredentials(of(credentials));
    this.setIssuers(of(this.buildIssuers(credentials)));
    this.setCredentialSchemas(of(credentialSchemas));
    this.setCredentialDefs(of(credentialDefs));

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
      did: 'abcd-1234-bd45-a9d8'
    }));

    return issuers;
  }

  setIssuers(data: Observable<IIssuer[]>) {
    this.issuers$ = data;
  }
}
