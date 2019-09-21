import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IRelationship {
  name: string;
  type: string;
  received: Date;
  did: string;
}

@Injectable({
  providedIn: 'root'
})
export class RelationshipsStateService {
  relationships$: BehaviorSubject<IRelationship[]> = new BehaviorSubject<
    IRelationship[]
  >(null);

  relationships = this.relationships$.asObservable();

  setRelationships(data: IRelationship[]) {
    this.relationships$.next(data);
  }

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

    this.relationships$.next(relationships);
  }
}
