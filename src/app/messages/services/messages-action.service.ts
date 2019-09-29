import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  IRelationshipResponse,
  IConnectionParams
} from '../models/i-relationship';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { IInvitation } from '../models/i-invitation';
import { MessagesStateService } from './messages-state.service';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MessagesActionService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  url: string;

  constructor(
    private http: HttpClient,
    private httpSvc: HttpService,
    private stateSvc: MessagesStateService
  ) {
    this.url = apiUrl;
    console.log('the url', this.url);

    // this.httpSvc.getConfig().then(config => this.init(config));
    this.init();
  }

  init() {
    this.stateSvc.setReady(true);
  }

  getRelationships(params: IConnectionParams = {}) {
    return (this.stateSvc.relationships$ = this.http.get<IRelationshipResponse>(
      `${this.url}relationships`,
      { headers: this.headers }
    ));
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
