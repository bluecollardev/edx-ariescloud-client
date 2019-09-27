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
    const apiUrl = 'http://localhost:3000/';

    this.url = apiUrl;
    // this.httpSvc.getConfig().then(config => this.init(config));
    this.init();
  }

  init() {
    this.stateSvc.setReady(true);
  }

  getRelationships(params: IConnectionParams = {}) {
    return this.stateSvc.relationships$ = this.http.get<IRelationshipResponse>(
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
