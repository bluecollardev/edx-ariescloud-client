import { Injectable } from '@angular/core';
import { IProfile } from '../profile.component';

@Injectable({
  providedIn: 'root'
})
export class ProfileActionsService {
  constructor() {}

  submitProfile(profile: IProfile) {
    // this is a stub for an http send service
    console.log('profile', profile);
  }
}
