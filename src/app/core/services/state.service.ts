import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';

const issuer = environment.issuer;
const prover = environment.prover;
const verifier = environment.verifier;

export interface IProfile {
  did: string;
  label: string;
  issuesCount: number;
  credsCount: number;
  proofsCount: number;
  relCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private schemas$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private profile$: BehaviorSubject<IProfile> = new BehaviorSubject<IProfile>(
    null,
  );

  schemas = this.schemas$.asObservable();
  profile = this.profile$.asObservable();
  isProver: boolean;
  isVerifier: boolean;
  isIssuer: boolean;

  get roles() {
    return {
      prover: this.isProver,
      verifier: this.isVerifier,
      issuer: this.isIssuer,
    };
  }

  setSchemas(data: any[]) {
    this.schemas$.next(data);
  }

  setProfile() {
    this.profile = this.httpSvc.get<IProfile>('profile');
  }

  constructor(private httpSvc: HttpService) {
    this.setProfile();

    this.isProver = prover;
    this.isVerifier = verifier;
    this.isIssuer = issuer;
  }
}
