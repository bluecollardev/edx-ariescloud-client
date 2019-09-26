import { Injectable } from '@angular/core';
import { ICredDef } from '../components/create-credential/create-credential.component';
import { CredentialStateService } from './credential-state.service';

@Injectable({
  providedIn: 'root'
})
export class CredentialActionsService {
  constructor(
    private stateSvc: CredentialStateService
  ) {}

  submitCredDef(credDef: ICredDef) {
    // this is a stub for an http send service
    console.log('cred def', credDef);
  }

  async loadCredDefs() {
    const response = {
      status: 200,
      data: [
        {
          issuedBy: 'Faber University',
          name: 'Bachelor\'s of Science Degree',
          program: 'Computer Science',
          version: '1.2',
          schema: 'university-degree'
        },
        {
          issuedBy: 'Faber University',
          name: 'Bachelor\'s of Science Degree',
          program: 'Microbiology',
          version: '1.2',
          schema: 'university-degree'
        },
        {
          issuedBy: 'Faber University',
          name: 'Master\'s of Business Administration',
          program: 'Business',
          version: '1.2',
          schema: 'university-degree'
        }]
    };

    const data = response.data;
    this.stateSvc.setCredentials(data);
  }

  async loadCredProofs() {
    const response = {
      status: 200,
      data: [
        {
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
          name: 'Bachelor\'s of Science Degree',
          version: '1.2',
          requested_attributes: {
            attr1_referents: {
              name: 'ipsum',
              restrictions: [{}]
            }
          },
          requested_predicates: []
        }]
    };

    const data = response.data;
    this.stateSvc.setProofs(data);
  }
}
