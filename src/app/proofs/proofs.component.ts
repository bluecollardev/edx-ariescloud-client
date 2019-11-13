import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import {
  CredentialStateService,
  ICertificateOfProof,
  ICredential,
  IIssuer,
  IProof,
  IProofResponse,
  ProofStateType,
} from '../credentials/services/credential-state.service';
import { IRelationship } from '../relationships/services/relationships-state.service';
import { ProofActionService } from './services/proof-action.service';
import { RelationshipsActionService } from '../relationships/services/relationships-action.service';
import { map, tap } from 'rxjs/operators';
import { ICredentialResponse } from '../credentials/components/credentials-received/credentials-received.component';
import { StateService } from '../core/services/state.service';

@Component({
  selector: 'app-credentials',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons
          slot="end"
          class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated"
        >
          <ion-menu-button
            class="hydrated ios button ion-activatable ion-focusable activated"
          ></ion-menu-button>
        </ion-buttons>
        <ion-buttons
          slot="start"
          class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated"
        >
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">Proofs</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row *ngIf="relationships | async as relationships">
          <ion-col>
            <ion-list>
              <ion-list-header
                class="ion-no-margin ion-no-padding"
                *ngIf="gState.isVerifier"
              >
                <div style="display: flex; width: 100%; flex-direction: column">
                  <span class="ion-padding">Request Proof of Claim</span>
                </div>
              </ion-list-header>
              <ion-item-sliding *ngFor="let relationship of relationships">
                <ion-item
                  (click)="presentActionSheet(relationship.connectionId)"
                >
                  <ion-icon name="person" class="icon-lg"></ion-icon>
                  <ion-label>
                    <h2>{{ relationship.label }}</h2>
                    <small>DID: {{ relationship.did }}</small>
                  </ion-label>
                  <ion-badge color="primary" item-end>{{
                    relationship.proofCount
                  }}</ion-badge>
                </ion-item>
              </ion-item-sliding>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-grid>
        <ion-row *ngIf="$proofs | async as proofs">
          <ion-col>
            <ion-list *ngIf="proofs.verified.length > 0">
              <ion-list-header class="ion-no-margin ion-no-padding">
                <div style="display: flex; width: 100%; flex-direction: column">
                  <span class="ion-padding">Verified Proofs</span>
                </div>
              </ion-list-header>
              <ion-item-sliding *ngFor="let proof of proofs.verified">
                <ion-item>
                  <ion-icon name="thumb-print" class="icon-lg"></ion-icon>
                  <ion-label>
                    <h3>{{ proof.presentation_request.name }}</h3>
                    <p>{{ proof.label }}</p>
                    <p>{{ proof.state }}</p>
                  </ion-label>
                  <ion-icon name="cloud-done" color="primary"></ion-icon>
                </ion-item>
              </ion-item-sliding>
            </ion-list>
            <ion-list *ngIf="proofs.presentation.length > 0">
              <ion-list-header class="ion-no-margin ion-no-padding">
                <div style="display: flex; width: 100%; flex-direction: column">
                  <span class="ion-padding">Presented Proofs</span>
                </div>
              </ion-list-header>
              <ion-item-sliding
                *ngFor="let proof of proofs.presentation"
                (click)="presentProofActions(proof._id, proof.state)"
              >
                <ion-item>
                  <ion-icon name="ribbon" class="icon-lg"></ion-icon>
                  <ion-label>
                    <h3>{{ proof.presentation_request.name }}</h3>
                    <p>{{ proof.label }}</p>
                    <p>{{ proof.state }}</p>
                  </ion-label>
                  <ion-icon
                    [name]="
                      proof.state === 'presentation_received'
                        ? 'alert'
                        : 'hourglass'
                    "
                    [color]="
                      proof.state === 'presentation_received'
                        ? 'danger'
                        : 'medium'
                    "
                  ></ion-icon>
                </ion-item>
              </ion-item-sliding>
            </ion-list>
            <ion-list *ngIf="proofs.proposal.length > 0">
              <ion-list-header class="ion-no-margin ion-no-padding">
                <div style="display: flex; width: 100%; flex-direction: column">
                  <span class="ion-padding">Proposed Proofs</span>
                </div>
              </ion-list-header>
              <ion-item-sliding
                *ngFor="let proof of proofs.proposal"
                (click)="presentProofActions(proof._id, proof.state)"
              >
                <ion-item>
                  <ion-icon name="pricetags" class="icon-lg"></ion-icon>
                  <ion-label>
                    <h3>{{ proof.presentation_request.name }}</h3>
                    <p>{{ proof.label }}</p>
                    <p>{{ proof.state }}</p>
                  </ion-label>
                  <ion-icon
                    [name]="
                      proof.state === 'proposal_received'
                        ? 'alert'
                        : 'hourglass'
                    "
                    [color]="
                      proof.state === 'proposal_received' ? 'danger' : 'medium'
                    "
                  ></ion-icon>
                </ion-item>
              </ion-item-sliding>
            </ion-list>
            <ion-list *ngIf="proofs.request.length > 0">
              <ion-list-header class="ion-no-margin ion-no-padding">
                <div style="display: flex; width: 100%; flex-direction: column">
                  <span class="ion-padding">Requested Proofs</span>
                </div>
              </ion-list-header>
              <ion-item-sliding
                *ngFor="let proof of proofs.request"
                (click)="presentProofActions(proof._id, proof.state)"
              >
                <ion-item>
                  <ion-icon name="wallet" class="icon-lg"></ion-icon>
                  <ion-label>
                    <h3>{{ proof.presentation_request.name }}</h3>
                    <p>{{ proof.label }}</p>
                    <p>{{ proof.state }}</p>
                  </ion-label>
                  <ion-icon
                    [name]="
                      proof.state === 'request_received' ? 'alert' : 'hourglass'
                    "
                    [color]="
                      proof.state === 'request_received' ? 'danger' : 'medium'
                    "
                  ></ion-icon>
                </ion-item>
              </ion-item-sliding>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ng-template #noProofs> </ng-template>
  `,
  styleUrls: ['./proofs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProofsComponent implements OnInit {
  searchQuery: '';
  credentials: Observable<ICredentialResponse[]>;
  relationships: Observable<IProofResponse[]>;
  issuers: Observable<IIssuer[]>;
  $proofs: Observable<{
    request: IProof[];
    proposal: IProof[];
    presentation: IProof[];
    verified: IProof[];
  }>;

  activeProofs$: IProof[];

  connectionId: string;

  async restrictionsMap(res: { [key: string]: string }) {
    return Object.keys(res).map(key => ({ type: key, value: res[key] }));
  }

  async activeProofs(id: string) {
    if (id === this.connectionId) {
      return (this.connectionId = undefined);
    }

    this.connectionId = id;
    // this.
    // this.activeProofs$ = activeProofs;
  }

  constructor(
    public router: Router,
    public stateSvc: CredentialStateService,
    public relationShipActionService: RelationshipsActionService,
    private actionSvc: ProofActionService,
    public actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private gState: StateService,
  ) {}

  async ngOnInit() {
    // console.log('bool', bool);
    this.credentials = this.stateSvc.credentials$;

    this.relationships = this.actionSvc.getProofs();

    this.issuers = this.stateSvc.issuers$;

    let $flat = this.actionSvc.getProofs().pipe(
      map(obs => {
        const flat = obs
          .map(itm => {
            let mapped = itm.proofs.map((proof, i, arr) => ({
              label: itm.label,
              ...proof,
            }));
            console.log(mapped);
            // return [...mapped].reduce((curr, next) => [...curr, ...next])
            return mapped;
          })
          .reduce((itm, next) => [...itm, ...next]);
        const request = flat.filter(
          proof =>
            proof.state === 'request_received' ||
            proof.state === 'request_sent',
        );
        const proposal = flat.filter(
          proof =>
            proof.state === 'proposal_received' ||
            proof.state === 'proposal_sent',
        );
        const presentation = flat.filter(
          proof =>
            proof.state === 'presentation_received' ||
            proof.state === 'presentation_sent',
        );
        const verified = flat.filter(proof => proof.state === 'verified');

        return {
          request,
          proposal,
          presentation,
          verified,
        };
      }),
      tap(obs => console.log(obs)),
    );
    this.$proofs = $flat;
  }

  async presentActionSheet(id: string) {
    this.connectionId = id;
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'View Certificates',
          role: 'destructive',
          handler: () => {
            this.router.navigate([
              '/verify-credentials/group/' + this.connectionId,
            ]);
          },
        },
        {
          text: 'Request a Proof',
          handler: () => {
            this.router.navigate([
              'verify-credentials/issue/' + this.connectionId,
            ]);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.actionSheetCtrl.dismiss();
            console.log('Cancel clicked');
          },
        },
      ],
    });

    await actionSheet.present();
  }

  async verifyCredPopup() {
    const alert = await this.alertController.create({
      header: 'Certificate Claims Verified',
      message:
        '<strong>Success!</strong> All claims within this certificate are valid.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          },
        },
      ],
    });

    await alert.present();
  }

  presentProofActions(id: string, state: ProofStateType) {
    this.router.navigate(['/verify-credentials/view/' + id]);
  }
}
