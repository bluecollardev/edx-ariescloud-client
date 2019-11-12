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
} from '../credentials/services/credential-state.service';
import { IRelationship } from '../relationships/services/relationships-state.service';
import { ProofActionService } from './services/proof-action.service';
import { RelationshipsActionService } from '../relationships/services/relationships-action.service';
import { map, tap } from 'rxjs/operators';
import { ICredentialResponse } from '../credentials/components/credentials-received/credentials-received.component';

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
              <ion-list-header class="ion-no-margin ion-no-padding">
                <div style="display: flex; width: 100%; flex-direction: column">
                  <span class="ion-padding">By Relationship</span>
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
    const activeProofs = await this.actionSvc
      .getProofs()
      .pipe(
        map(obs =>
          obs
            .filter(proof => proof.connectionId === id)
            .map(proof => proof.proofs)
            .reduce(proof => {
              return proof;
            }),
        ),

        // map(obs => obs.reduce((a, b) => a)),
        tap(obs => console.log(obs)),
      )
      .toPromise();
    // this.activeProofs$ = activeProofs;
  }

  constructor(
    public router: Router,
    public stateSvc: CredentialStateService,
    public relationShipActionService: RelationshipsActionService,
    private actionSvc: ProofActionService,
    public actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
  ) {
    this.initializeItems();
  }

  async ngOnInit() {
    // console.log('bool', bool);
    this.credentials = this.stateSvc.credentials$;

    this.relationships = this.actionSvc.getProofs();

    this.issuers = this.stateSvc.issuers$;
    // this.stateSvc.certificatesOfProof$ = this.actionSvc.getProofs();
    // this.proofs = await this.stateSvc.certificatesOfProof$.toPromise();
  }

  async initializeItems() {
    // await this.actionSvc.getCertificates();
  }

  async getItems(issuers, ev: any) {
    const filtered = [];
    // Reset items back to all of the items
    // await this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      /* this.issuers = this.issuers.filter(item => {
         return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
       });*/
    }

    return filtered;
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
}
