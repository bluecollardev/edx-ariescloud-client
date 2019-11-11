import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { HttpService } from './http.service';

export interface IProfile {
  did: string;
  label: string;
  issuesCount: number;
  credsCount: number;
  proofsCount: number;
  relCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private schemas$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private profile$: BehaviorSubject<IProfile> = new BehaviorSubject<IProfile>(
    null
  );

  schemas = this.schemas$.asObservable();
  profile = this.profile$.asObservable();

  setSchemas(data: any[]) {
    this.schemas$.next(data);
  }

  setProfile(data: IProfile) {
    this.profile$.next(data);
  }

  constructor(private httpSvc: HttpService) {
    const schema = ['name', 'degree', 'status', 'year', 'average', 'ssn'];

    const profile = this.httpSvc.get<IProfile>('profile');

    this.setSchemas([schema]);

    profile.subscribe(this.profile$);
  }
}
