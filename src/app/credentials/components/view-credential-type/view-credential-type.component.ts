import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  CredentialStateService,
  ICredentialDef,
} from '../../services/credential-state.service';
import { CredentialActionsService } from '../../services/credential-actions.service';

// import { ICredentialResponse } from '../../models/i-credential';

@Component({
  selector: 'app-view-credential',
  template: `
    <app-item-header title="Preview Credential" default="/credentials/types">
    </app-item-header>
    <ion-content color="light">
      <ion-card text-center *ngIf="active$ | async as active">
        <img
          src="https://insidelatinamerica.net/wp-content/uploads/2018/01/noImg_2.jpg"
        />
        <ion-list>
          <app-list-header [title]="active.name"></app-list-header>
          <app-list-item
            *ngFor="let attr of active.attributes"
            [label]="attr"
            color="secondary"
            value="Example value"
          ></app-list-item>
          <app-list-item-stacked
            label="Credential Referent"
            value="faeb3bed-f5bc-45cc-9fbf-d19f1bfdea73"
          >
          </app-list-item-stacked>
          <app-list-item-stacked
            label="Credential Definition Id"
            [value]="active._id"
          >
          </app-list-item-stacked>
          <app-list-item-stacked
            label="Schema Id"
            value="PQRXDxdGqQGSZ8z69p4xZP:2:test:1.0"
          >
          </app-list-item-stacked>
        </ion-list>
        <ion-item (click)="navigate(active._id)" lines="none" color="primary">
          <ion-badge slot="end" color="primary">Issue</ion-badge>
        </ion-item>
      </ion-card>
    </ion-content>
  `,
  styleUrls: ['./view-credential-type.component.scss'],
})
// TODO: correct schema imports for the id on the cred def route
export class ViewCredentialTypeComponent implements OnInit {
  active$: Observable<ICredentialDef>;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private actionSvc: CredentialActionsService,
  ) {
    this.active$ = this.actionSvc
      .getCredentialDef(this.route.snapshot.paramMap.get('id'))
      .pipe(tap(obs => console.log(obs)));
  }

  ngOnInit() {}
  navigate(id: string) {
    this.router.navigate([`/credentials/issue/` + id]);
  }
}
