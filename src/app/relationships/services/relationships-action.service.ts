import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import {
  IRelationshipResponse,
  IConnectionParams
} from '../models/i-relationship';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { IInvitation } from '../models/i-invitation';
import {
  RelationshipsStateService,
  IRelationship
} from './relationships-state.service';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RelationshipsActionService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  url: string;

  constructor(
    private http: HttpClient,
    private httpSvc: HttpService,
    private stateSvc: RelationshipsStateService
  ) {
    this.url = apiUrl;
    console.log(apiUrl);
  }

  getPendingInvitation(did: string, params: IConnectionParams = {}) {
    const invitation = this.http.get<IRelationship[]>(
      `${this.url}relationships/${did}`,
      { headers: this.headers }
    );

    this.stateSvc.setActiveInvitation(did);

    console.log('active invitation');
    console.log(this.stateSvc.activeInvitation$);

    return this.stateSvc.activeInvitation$;
  }

  getPendingInvitations(params: IConnectionParams = {}) {
    const pendingInvitations = this.http.get<IRelationship[]>(
      `${this.url}relationships`,
      { headers: this.headers }
    );

    return this.stateSvc.pendingInvitations$;
  }

  getRelationship(did: string, params: IConnectionParams = {}) {
    const relationship = this.http.get<IRelationship[]>(
      `${this.url}relationships/${did}`,
      { headers: this.headers }
    );

    this.stateSvc.setActiveRelationship(did);

    console.log('active relationship');
    console.log(this.stateSvc.activeRelationship$);

    return this.stateSvc.activeRelationship$;
  }

  getRelationships() {
    const relationships = this.httpSvc.get<IRelationship[]>('relationships');

    return relationships;
  }

  getRelationshipByState(state: string) {
    const relationships = this.http.get<IRelationship[]>(
      `${this.url}relationships`,
      {
        params: { state }
      }
    );
    return relationships;
  }
  createInvitation() {
    this.stateSvc.invitation$ = this.http.post<IInvitation>(
      `${this.url}relationships`,
      {
        headers: this.headers
      }
    );
  }

  async acceptInvitation(invite: any) {
    return await this.httpSvc.post<IInvitation>('invitations', invite);
    // const text = await this.stateSvc.invitation$.toPromise();
    // console.log(text);
  }
}
