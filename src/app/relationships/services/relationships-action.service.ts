import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  IRelationshipResponse,
  IConnectionParams
} from '../models/i-relationship';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.acme';
import { HttpService, IHttpConfig } from 'src/app/core/services/http.service';
import { IInvitation } from '../models/i-invitation';
import { RelationshipsStateService } from './relationships-state.service';

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
    console.log('the url', this.url);
    this.httpSvc.getConfig().then(config => this.init(config));
  }

  init(config: IHttpConfig) {
    if (!config) return;
    console.log('config', config);
    this.url = config.apiUrl;
    this.stateSvc.setReady(true);
  }

  getRelationships(params: IConnectionParams = {}) {
    this.stateSvc.relationships$ = this.http.get<IRelationshipResponse>(
      `${this.url}relationships`,
      { headers: this.headers }
    );
  }

  createInvitation() {
    this.stateSvc.invitation$ = this.http.post<IInvitation>(
      `${this.url}relationships`,
      {
        headers: this.headers
      }
    );
  }
}
