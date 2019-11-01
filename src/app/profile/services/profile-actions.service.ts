import { Injectable } from '@angular/core';
import { IProfile } from '../profile.component';
import { HttpService } from 'src/app/core/services/http.service';

export interface IProfileResult {
  label: string;
  messageCount: number;
  credsCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileActionsService {
  constructor(private httpSvc: HttpService) {}

  submitProfile(profile: IProfile) {
    // this is a stub for an http send service
    console.log('profile', profile);
  }

  getProfile() {
    return this.httpSvc.get<IProfileResult>('profile');
  }
}
