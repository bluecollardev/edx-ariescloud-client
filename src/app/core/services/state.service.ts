import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IProfile {
  name: string;
  relationshipCount: number;
  messages: string[];
  did: string;
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

  constructor() {
    // const schema = {
    //   average: 5,
    //   degree: 'Computer Science',
    //   name: 'Alice Cooper',
    //   status: 'active',
    //   year: new Date(),
    //   img: ''
    // };

    const schema = ['name', 'degree', 'status', 'year', 'average', 'ssn'];

    const profile = {
      name: 'Alice Cooper',
      relationshipCount: 5,
      messages: ['1', '2', '3'],
      did: 'xyz-124fds-zxcv-rewr'
    };

    this.setSchemas([schema]);
    this.setProfile(profile);
  }
}
