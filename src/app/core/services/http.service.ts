import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IHttpConfig {
  apiUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  config: IHttpConfig;

  async getConfig() {
    // TODO: Correct this for all enviornments
    return await this.http
      .get<IHttpConfig>('assets/http-dev-config.json', {})
      .toPromise();
  }

  constructor(private http: HttpClient) {
    this.getConfig().then(config => {
      console.log('config');
      this.config = config;
    });
  }
}
