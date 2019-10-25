import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  HttpService,
  IMessageResult,
  IInvitationResult
} from 'src/app/core/services/http.service';
import { MessagesStateService } from './messages-state.service';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MessagesActionService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  url: string;

  constructor(
    private httpSvc: HttpService,
    private stateSvc: MessagesStateService
  ) {
    this.url = apiUrl;
    console.log('the url', this.url);

    // this.httpSvc.getConfig().then(config => this.init(config));
  }

  getMessages() {
    return this.httpSvc.get<IMessageResult>('messages');
  }

  createInvitation() {
    return this.httpSvc.get<IInvitationResult>('invitations');
  }
}
