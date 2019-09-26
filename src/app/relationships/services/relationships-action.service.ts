import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IRelationshipResponse,
  IConnectionParams
} from '../models/i-relationship';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.acme';
import { HttpService, IHttpConfig } from 'src/app/core/services/http.service';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RelationshipsActionService {
  relationships$: Observable<IRelationshipResponse>;
  url: string;
  constructor(private http: HttpClient, private httpSvc: HttpService) {
    console.log('the url', this.url);
    this.httpSvc.getConfig().then(config => this.init(config));
  }

  getRelationships(params: IConnectionParams = {}) {}

  init(config: IHttpConfig) {
    this.url = config.apiUrl;
    const obs = this.http.get<IRelationshipResponse>(
      `${this.url}relationships`
      // { headers: { header: 'Access-Control-Allow-Origin' } }
    );
    obs.subscribe(data => console.log(data));
  }
}
