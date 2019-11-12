import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  first,
  last,
  map,
  reduce,
  find,
  filter,
  skipWhile,
  single,
} from 'rxjs/operators';
import { IInvitation } from '../models/i-invitation';
import { IRelationshipResponse } from '../models/i-relationship';

export interface IRelationship {
  name: string;
  type: string;
  received: Date;
  did: string;
  publicDid: string;
  state: string;
  _id: string;
}

@Injectable({
  providedIn: 'root',
})
export class RelationshipStateService {
  private _ready$ = new BehaviorSubject<boolean>(false);
  ready = this._ready$.asObservable();

  invitation$: Observable<IInvitation> = new Observable<IInvitation>();
  activeInvitation$: Observable<IRelationship[]> = new Observable<
    IRelationship[]
  >();
  pendingInvitations$: Observable<IRelationship[]> = new Observable<
    IRelationship[]
  >();
  // TODO: I don't know how to just grab one, whatever... I'll just use a stupid array for now
  activeRelationship$: Observable<IRelationship[]> = new Observable<
    IRelationship[]
  >();
  relationships$: Observable<IRelationship[]> = new Observable<
    IRelationship[]
  >();

  constructor() {
    const pending = of([
      {
        name: 'Faber University',
        type: 'issuer',
        received: new Date(),
        did: 'xyzdf-213ras-eqadzx-123sd',
        publicDid: 'GqaFzVnQTXVYzqSVnDETwP',
        status: 'pending',
      },
    ]);

    const relationships = of([
      {
        name: 'ACME Inc.',
        type: 'verifier',
        received: new Date(),
        did: 'xyzdf-678ras-eqadzx-123qr',
        publicDid: 'GqaFzVnQTXVYzqSVnDETwP',
        status: 'active',
      },
      {
        name: 'Wall Street Co.',
        type: 'verifier',
        received: new Date(),
        did: 'xyzdf-678ras-adsf324-fg456',
        publicDid: 'GqaFzVnQTXVYzqSVnDETwP',
        status: 'active',
      },
      {
        name: 'Google Inc.',
        type: 'verifier',
        received: new Date(),
        did: 'xyzdf-678ras-eqadzx-784yx',
        publicDid: 'GqaFzVnQTXVYzqSVnDETwP',
        status: 'active',
      },
    ]);

    // this.setPendingInvitations(pending);
    // this.setRelationships(relationships);
    this.setReady(true);
  }

  setReady(bool: boolean) {
    this._ready$.next(bool);
  }

  setRelationship(data: IRelationship) {
    // this.activeRelationship$ = this.relationships$.pipe(
    //  map(rs => rs.filter(r => r.did === data.did)[0])
    // );
  }

  setActiveRelationship(did: string) {
    this.activeRelationship$ = this.relationships$.pipe(
      map(rs => {
        return rs.filter(r => {
          console.log('------------');
          console.log(r);
          console.log(r.did);
          console.log(did);
          console.log('------------');
          return r.did === did;
        });
      }),
    );
  }

  setActiveInvitation(did: string) {
    this.activeInvitation$ = this.pendingInvitations$.pipe(
      map(rs => {
        return rs.filter(r => {
          console.log('------------');
          console.log(r);
          console.log(r.did);
          console.log(did);
          console.log('------------');
          return r.did === did;
        });
      }),
    );
  }

  setRelationships(data: Observable<IRelationship[]>) {
    this.relationships$ = data;
  }

  setPendingInvitations(data: Observable<IRelationship[]>) {
    this.pendingInvitations$ = data;
  }
}
