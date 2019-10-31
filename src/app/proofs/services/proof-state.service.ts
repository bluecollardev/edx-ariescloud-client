import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProofStateService {
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

  constructor() {}
}
