import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import {
  CredentialStateService,
  ICertificateOfProof,
  ICredential,
  IIssuer
} from '../credentials/services/credential-state.service';
import {
  RelationshipsStateService,
  IRelationship
} from '../relationships/services/relationships-state.service';
import { ProofActionService } from './services/proof-action.service';
import { RelationshipsActionService } from '../relationships/services/relationships-action.service';
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
        <ion-title class="ios title-ios hydrated">Proof Certificates</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row *ngIf="relationships | async as relationships">
          <ion-col sizeXs="12" sizeMd="12" pushMd="12" sizeXl="8" pushXl="2">
            <ion-list>
              <ion-list-header class="ion-no-margin ion-no-padding">
                <div style="display: flex; width: 100%; flex-direction: column">
                  <span class="ion-padding">By Relationship</span>
                  <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>
                </div>
              </ion-list-header>
              <ion-item-sliding
                *ngFor="let relationship of relationships"
                (click)="
                  this.router.navigate([
                    '/verify-credentials/group/' + relationship._id
                  ])
                "
              >
                <ion-item>
                  <ion-icon name="person" class="icon-lg"></ion-icon>
                  <ion-label>
                    <h2>{{ relationship.name }}</h2>
                    <small>DID: {{ relationship.did }}</small>
                  </ion-label>
                  <ion-badge color="primary" item-end>2</ion-badge>
                </ion-item>
              </ion-item-sliding>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./proofs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProofsComponent implements OnInit {
  searchQuery: '';
  credentials: Observable<ICredentialResponse[]>;
  relationships: Observable<IRelationship[]>;
  issuers: Observable<IIssuer[]>;
  proofs: Observable<ICertificateOfProof[]>;

  constructor(
    public router: Router,
    public stateSvc: CredentialStateService,
    public relationShipActionService: RelationshipsActionService,
    private actionSvc: ProofActionService,
    public actionSheetCtrl: ActionSheetController,
    private alertController: AlertController
  ) {
    this.initializeItems();
  }

  ngOnInit() {
    // console.log('bool', bool);
    this.credentials = this.stateSvc.credentials$;

    this.relationships = this.relationShipActionService.getRelationshipByState(
      'active'
    );

    this.issuers = this.stateSvc.issuers$;
    this.stateSvc.certificatesOfProof$ = this.actionSvc.getProofs();
    this.proofs = this.stateSvc.certificatesOfProof$;
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

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'View Certificate',
          handler: () => this.router.navigate(['/verify-credentials/view'])
        },
        {
          text: 'Verify Certificate Claims',
          handler: () => {
            this.verifyCredPopup();
          }
        },
        {
          text: 'Delete Certificate',
          role: 'destructive',
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
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
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }
}
