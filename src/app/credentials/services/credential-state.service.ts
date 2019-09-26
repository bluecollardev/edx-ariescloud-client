import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredentialStateService {
  private proofs$ = new BehaviorSubject<any[]>(null);
  private credentials$ = new BehaviorSubject<any[]>(null);
  private issuers$ = new BehaviorSubject<any[]>(null);

  proofs = this.proofs$.asObservable();
  credentials = this.credentials$.asObservable();
  issuers = this.issuers$.asObservable();

  constructor() {
  }

  setProofs(data: any[]) {
    this.proofs$.next(data);
  }

  setCredentials(data: any[]) {
    this.setIssuers(data);
    this.credentials$.next(data);
  }

  setIssuers(creds: any[]) {
    const data = creds
      .filter((cred, idx, arr) => {
        return arr
          .map((item) => item.issuedBy)
          .indexOf(cred.issuedBy) === idx;
      })
      .map((cred) => ({
        name: cred.issuedBy,
        type: 'Organization',
        did: 'abcd-1234-bd45-a9d8'
      }));

    this.issuers$.next(data);
  }
}
