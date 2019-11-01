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
  RelationshipStateService,
  IRelationship
} from './relationship-state.service';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RelationshipActionsService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  url: string;

  constructor(
    private http: HttpClient,
    private httpSvc: HttpService,
    private stateSvc: RelationshipStateService
  ) {
    this.url = apiUrl;
  }

  getRelationship(did: string, params: IConnectionParams = {}) {
    const relationship = this.http.get<IRelationship[]>(
      `${this.url}relationships/${did}`,
      { headers: this.headers }
    );

    this.stateSvc.setActiveRelationship(did);

    return this.stateSvc.activeRelationship$;
  }

  getRelationships() {
    const relationships = this.httpSvc.get<IRelationship[]>('relationships');

    return relationships;
  }

  getRelationshipById(id: string) {
    const relationship = this.httpSvc.getById<IRelationship>(
      'relationships',
      id
    );
    return relationship;
  }

  getRelationshipByState(state: string) {
    const relationships = this.http.get<IRelationship[]>(
      `${this.url}relationships`,
      {
        params: { state: state }
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
    return await this.httpSvc
      .post<IInvitation>('invitations', invite)
      .toPromise();
    // const text = await this.stateSvc.invitation$.toPromise();
    // console.log(text);
  }

  async resetRelState() {
    const pending$ = await this.getRelationships().toPromise();
    const pending = pending$.filter(
      itm => itm.state !== 'active' && itm.state !== 'invitation'
    );
    this.stateSvc.pendingInvitations$ = of(pending);
    this.stateSvc.activeRelationship$ = this.getRelationshipByState('active');
  }
}
