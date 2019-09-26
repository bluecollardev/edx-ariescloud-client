import { Injectable } from '@angular/core';
import { ICredDef } from '../components/create-credential/create-credential.component';

@Injectable({
  providedIn: 'root'
})
export class CredentialActionsService {
  constructor() {}

  submitCredDef(credDef: ICredDef) {
    // this is a stub for an http send service
    console.log('cred def', credDef);
  }
}
