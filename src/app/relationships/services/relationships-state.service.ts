import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { first, last, map, reduce, find, filter, skipWhile } from 'rxjs/operators';
import { IInvitation } from '../models/i-invitation';
import { IRelationshipResponse } from '../models/i-relationship';

export interface IRelationship {
  name: string;
  type: string;
  received: Date;
  did: string;
  publicDid: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class RelationshipsStateService {
  private _ready$ = new BehaviorSubject<boolean>(false);
  ready = this._ready$.asObservable();

  invitation$: Observable<IInvitation> = new Observable<IInvitation>();
  pendingInvitations$: Observable<IRelationship[]> = new Observable<IRelationship[]>();
  relationships$: Observable<IRelationship[]> = new Observable<IRelationship[]>();

  constructor() {
    const pending = of([
      {
        name: 'Faber',
        type: 'issuer',
        received: new Date(),
        did: 'xyzdf-213ras-eqadzx-123sd',
        publicDid: 'GqaFzVnQTXVYzqSVnDETwP',
        status: 'pending'
      }
    ]);

    const relationships = of([
      {
        name: 'ACME Inc.',
        type: 'verifier',
        received: new Date(),
        did: 'xyzdf-213ras-eqadzx-123sd',
        publicDid: 'GqaFzVnQTXVYzqSVnDETwP',
        status: 'active'
      }
    ]);

    this.setRelationships(pending);
    this.setPendingInvitations(relationships);
    this.setReady(true);
  }

  setReady(bool: boolean) {
    this._ready$.next(bool);
  }

  setRelationship(data: IRelationship) {
    return this.relationships$.pipe(
      map(rs => rs.find(r => r.did === data.did))
    );
  }

  setRelationships(data: Observable<IRelationship[]>) {
    this.relationships$ = data;
  }

  setPendingInvitations(data: Observable<IRelationship[]>) {
    this.pendingInvitations$ = data;
  }
}
