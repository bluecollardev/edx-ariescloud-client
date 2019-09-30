import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';

import { CredentialStateService, ICredentialSchema, ICredentialDef, ICredential, ICredentialProof } from './credential-state.service';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CredentialActionsService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  url: string;

  constructor(
    private http: HttpClient,
    private httpSvc: HttpService,
    private stateSvc: CredentialStateService
  ) {
    this.url = apiUrl;
    console.log(apiUrl);
  }

  submitCredDef(credDef: ICredentialDef) {
    // this is a stub for an http send service
    console.log('cred def', credDef);
  }

  async loadCredDefs() {
    const response = {
      status: 200,
      data: []
    };

    const data = of(response.data);
    this.stateSvc.setCredentials(data);

    return this.stateSvc.credentials$;
  }

  async loadCredProofs() {
    const response = {
      status: 200,
      data: []
    };

    const data = response.data;
    this.stateSvc.setProofs(data);
  }

  getCredential(id: string) {
    const credential = this.http.get<ICredentialDef[]>(
      `${this.url}credentials/${id}`,
      { headers: this.headers }
    );

    this.stateSvc.setActiveCredential(id);

    console.log('active credential');
    console.log(this.stateSvc.activeCredential$);

    return this.stateSvc.activeCredential$;
  }

  getCredentials() {
    const credentials = this.http.get<ICredentialDef[]>(
      `${this.url}credentials`,
      { headers: this.headers }
    );

    return this.stateSvc.credentials$;
  }

  createCredentialSchema() {
    this.http.post<ICredentialDef[]>(
      `${this.url}credentials`,
      {
        headers: this.headers
      }
    );
  }

  getCredentialSchema(id: string) {
    const credential = this.http.get<ICredentialSchema[]>(
      `${this.url}credentials/${id}`,
      { headers: this.headers }
    );

    this.stateSvc.setActiveCredentialSchema(id);

    console.log('active credential');
    console.log(this.stateSvc.activeCredential$);

    return this.stateSvc.activeCredential$;
  }

  createCredentialDef() {
    this.http.post<ICredentialDef[]>(
      `${this.url}credentials`,
      {
        headers: this.headers
      }
    );
  }

  acceptCredential() {
    this.http.put<ICredentialDef[]>(
      `${this.url}credentials`,
      {
        headers: this.headers
      }
    );
  }
}
