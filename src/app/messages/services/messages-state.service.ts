import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IInvitation } from '../models/i-invitation';
import { IRelationshipResponse } from '../models/i-relationship';
import { IMessageResult } from 'src/app/core/services/http.service';

export interface IRelationship {
  name: string;
  type: string;
  received: Date;
  did: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessagesStateService {
  // relationships$: BehaviorSubject<IRelationship[]> = new BehaviorSubject<
  // IRelationship[]
  // >(null);

  // relationships = this.relationships$.asObservable();

  invitation$: Observable<IInvitation>;
  messages$: Observable<IMessageResult>;

  constructor() {
    const relationships = [
      {
        name: 'Faber',
        type: 'foo',
        received: new Date(),
        did: 'xyzdf-213ras-eqadzx-123sd',
        publicDid: 'GqaFzVnQTXVYzqSVnDETwP'
      },
      {
        name: 'Acme',
        type: 'bar',
        received: new Date(),
        did: 'adslfj-1234-cxv324-asfxdf',
        publicDid: 'NEBWptNanb25KNRmogbPZ3'
      }
    ];

    // this.relationships$.next(relationships);
  }
}
