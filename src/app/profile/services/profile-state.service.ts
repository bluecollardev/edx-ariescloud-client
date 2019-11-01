import { Injectable } from '@angular/core';
import { IProfileResult } from './profile-actions.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileStateService {
  profile$: Observable<IProfileResult>;
  constructor() {}
}
