import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

import {
  CredentialStateService,
  ICredentialDef,
  ICredential,
} from '../../services/credential-state.service';
import {
  CredentialActionsService,
  ICredentialParams,
} from '../../services/credential-actions.service';
import { tap, map, flatMap } from 'rxjs/operators';
import { ICredentialResponse } from '../credentials-received/credentials-received.component';
import { RelationshipActionsService } from '../../services/relationship-actions.service';

@Component({
  selector: 'app-credentials-issued',
  template: `
    <ng-container>
      <ion-content>
        <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
          <ion-refresher-content
            pullingIcon="arrow-dropdown"
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Getting relationships..."
          >
          </ion-refresher-content>
        </ion-refresher>
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-list
                *ngIf="credentialDefs | async as credDefs; else noCreds"
              >
                <ion-list-header class="ion-no-margin ion-no-padding">
                  <div
                    style="display: flex; width: 100%; flex-direction: column"
                  >
                    <span class="ion-padding">Issued Credentials By Type</span>
                  </div>
                </ion-list-header>
                <ion-item-sliding *ngFor="let credDef of credDefs; index as i">
                  <ion-item (click)="presentActionSheet(credDef._id)">
                    <ion-icon name="cog" size="medium" slot="start"></ion-icon>
                    <ion-label>
                      <h2>{{ credDef.name }}</h2>
                      <small>{{ credDef.program }}</small>
                      <small>Version: {{ credDef.version }}</small>
                    </ion-label>
                    <ion-badge [color]="getColor(credDef.count)" item-end>{{
                      credDef.count
                    }}</ion-badge>
                  </ion-item>

                  <ion-item-options>
                    <ion-item-option color="danger" type="button" icon-start>
                      <ion-icon name="trash" class="icon-md"></ion-icon>
                      Delete
                    </ion-item-option>
                    <ion-item-option color="light" type="button" icon-start>
                      <ion-icon name="ios-eye-off" class="icon-md"></ion-icon>
                      Disable
                    </ion-item-option>
                  </ion-item-options>
                </ion-item-sliding>
              </ion-list>
            </ion-col>
          </ion-row>
        </ion-grid>
        <!---

        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-list *ngIf="$all | async as creds; else noCreds">
                <ion-list-header class="ion-no-margin ion-no-padding">
                  <div
                    style="display: flex; width: 100%; flex-direction: column"
                  >
                    <span class="ion-padding">Issued Credentials</span>
                  </div>
                </ion-list-header>
                <ion-item-sliding *ngFor="let cred of creds; index as i">
                  <ion-item (click)="presentActionSheet(cred._id)">
                    <ion-icon name="cog" class="icon-lg"></ion-icon>
                    <ion-label>
                      <h2>{{ cred.name }}</h2>
                      <p>{{ cred.label }}</p>
                      <p>{{ cred.state }}</p>
                    </ion-label>
                  </ion-item>

                  <ion-item-options>
                    <ion-item-option color="danger" type="button" icon-start>
                      <ion-icon name="trash" class="icon-md"></ion-icon>
                      Delete
                    </ion-item-option>
                    <ion-item-option color="light" type="button" icon-start>
                      <ion-icon name="ios-eye-off" class="icon-md"></ion-icon>
                      Disable
                    </ion-item-option>
                  </ion-item-options>
                </ion-item-sliding>
              </ion-list>
            </ion-col>
          </ion-row>
        </ion-grid>
        -->
      </ion-content>
    </ng-container>
    <ng-template #noCreds></ng-template>
  `,
  styleUrls: ['./credentials-issued.component.css'],
})
export class CredentialsIssuedComponent implements OnInit {
  viewRecord: string;
  searchQuery: '';
  credentialDefs: Observable<any[]>;
  credentials: Observable<ICredential[]>;
  $all: Observable<any[]>;
  _id: string;

  getColor(count: number) {
    return count < 1 ? 'medium' : count < 5 ? 'secondary' : 'primary';
  }
  constructor(
    private router: Router,
    private actionSvc: CredentialActionsService,
    public actionSheetCtrl: ActionSheetController,
    public loadingController: LoadingController,
    private relActionSvc: RelationshipActionsService,
  ) {}

  async ngOnInit() {
    this.$all = this.actionSvc.getFlatCredentials().pipe(
      flatMap(
        source => this.relActionSvc.getRelationships(),
        (source, next) => {
          let mapped = source.map(itm => ({
            name: next.filter(conn => conn._id === itm.connection_id)[0].name,
            ...itm,
          }));
          return mapped;
        },
      ),
      flatMap(
        source => this.actionSvc.getCredentialDefs(),
        (source, next) => {
          const mapped = source.map(
            itm => ({
              ...itm,
              label: next.filter(
                credDef =>
                  itm.credential_definition_id ===
                  credDef._id.slice(credDef._id.indexOf('_') + 1),
              )[0].name,
            }),
            ///,
          );
          console.log(mapped);
          return mapped;
        },
      ),
      tap(val => console.log(val)),
    );

    const credentials = await this.actionSvc
      .getPendingIssues()
      .pipe(
        map(itms =>
          itms.map(itm =>
            itm.records
              .map(record => ({
                _id: itm.credential_exchange_id,
                ...itm,
                ...record,
              }))
              .reduce(itm => itm),
          ),
        ),
        tap(obs => console.log(obs)),
      )
      .toPromise();
    // credentials.subscribe(obs => console.log(obs));
    this.credentialDefs = this.actionSvc.getCredentialDefs().pipe(
      map(obs =>
        obs.map(credDef => ({
          count: credentials.filter(
            cred =>
              cred.credential_definition_id ===
              credDef._id.slice(credDef._id.indexOf('_' + 1)),
          ).length,
          ...credDef,
        })),
      ),
      tap(obs => console.log(obs)),
    );
    // const credentials = await this.actionSvc.getCredentials().toPromise();
    // console.log(credentials);
  }

  async presentActionSheet(credDefId: any) {
    this._id = credDefId;
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Manage Recipients',
          handler: () => {
            this.router.navigate([`/credentials/${this._id}/recipients`]);
          },
        },
        {
          text: 'Issue Credential To...',
          handler: () => {
            this.router.navigate([`/credentials/issue/${this._id}`]);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });

    await actionSheet.present();
  }

  async doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 750);
  }
}

export interface IIssueFlat {
  state: string;
  credential_exchange_id: string;
  auto_issue: boolean;
  auto_offer: boolean;
  credential_request: CredentialRequest;
  thread_id: string;
  initiator: string;
  schema_id: string;
  created_at: string;
  connection_id: string;
  credential_offer: CredentialOffer;
  updated_at: string;
  credential_definition_id: string;
  credential_proposal_dict: CredentialProposalDict;
}
export interface CredentialRequest {
  prover_did: string;
  cred_def_id: string;
  blinded_ms: BlindedMs;
  blinded_ms_correctness_proof: BlindedMsCorrectnessProof;
  nonce: string;
}
export interface BlindedMs {
  u: string;
  ur?: null;
  hidden_attributes?: string[] | null;
  committed_attributes: CommittedAttributesOrRCaps;
}
export interface CommittedAttributesOrRCaps {}
export interface BlindedMsCorrectnessProof {
  c: string;
  v_dash_cap: string;
  m_caps: MCaps;
  r_caps: CommittedAttributesOrRCaps;
}
export interface MCaps {
  master_secret: string;
}
export interface CredentialOffer {
  schema_id: string;
  cred_def_id: string;
  key_correctness_proof: KeyCorrectnessProof;
  nonce: string;
}
export interface KeyCorrectnessProof {
  c: string;
  xz_cap: string;
  xr_cap?: (string[] | null)[] | null;
}
export interface CredentialProposalDict {
  '@type': string;
  '  @id': string;
  comment: string;
  cred_def_id: string;
  credential_proposal: CredentialProposal;
}
export interface CredentialProposal {
  '@type': string;
  attributes?: AttributesEntity[] | null;
}
export interface AttributesEntity {
  name: string;
  value: string;
}
