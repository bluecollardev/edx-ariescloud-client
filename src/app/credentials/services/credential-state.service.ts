import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredentialStateService {
  private proofs$ = new BehaviorSubject<any[]>(null);
  private credentials$ = new BehaviorSubject<any[]>(null);

  proofs = this.proofs$.asObservable();
  credentials = this.credentials$.asObservable();

  setProofs(data: any[]) {
    this.proofs$.next(data);
  }

  setCredentials(data: any[]) {
    this.credentials$.next(data);
  }

  constructor() {
    const proof = {
      name: 'University Degree',
      version: '1.2',
      requested_attributes: {
        attr1_referents: {
          name: 'zzzzz',
          restrictions: [{}]
        }
      },
      requested_predicates: []
    };

    const governmentCredential = {
      email: 'alice@faber.edu',
      name: 'Alice',
      tax_id: '123-45-6789'
    };

    this.setProofs([proof]);
  }
}
