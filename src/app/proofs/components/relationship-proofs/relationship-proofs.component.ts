import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  CredentialStateService,
  ICertificateOfProof,
  ICredential,
  IIssuer,
  IProof,
  IProofResponse
} from '../../../credentials/services/credential-state.service';
import {
  RelationshipsStateService,
  IRelationship
} from '../../../relationships/services/relationships-state.service';
import { CredentialActionsService } from '../../../credentials/services/credential-actions.service';
import { RelationshipsActionService } from '../../../relationships/services/relationships-action.service';
import { ProofActionService } from '../../services/proof-action.service';
import { ICredentialResponse } from 'src/app/credentials/components/credentials-received/credentials-received.component';

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
        <ion-title
          class="ios title-ios hydrated"
          *ngIf="proofs$ | async as proofs; else generic"
          >{{ proofs.label }}'s Proof Certificates</ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row *ngIf="proofs$ | async as proofs">
          <ion-col sizeXs="12" sizeMd="12" pushMd="12" sizeXl="8" pushXl="2">
            <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>
            <ion-grid style="width: 100%;">
              <ion-row *ngIf="proofs.proofs.length > 0; else noProofs">
                <ion-col
                  *ngFor="let certificate of proofs.proofs"
                  sizeXs="6"
                  sizeSm="4"
                  sizeMd="3"
                  sizeLg="2"
                >
                  <ion-card
                    text-center
                    (click)="presentActionSheet(certificate._id)"
                  >
                    <ion-card-header>
                      {{ certificate.issuedTo }}
                    </ion-card-header>
                    <ion-icon name="document" class="icon-lg"></ion-icon>
                    <ion-card-content
                      *ngFor="let request of certificate.requested"
                    >
                      <p>
                        <strong> {{ request.restrictions.schema_name }}</strong>
                      </p>
                      <br />
                      <p>{{ request.name }}</p>
                      <p>{{ certificate.state }}</p>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
              </ion-row>
            </ion-grid>
            <div class="ion-padding">
              <ion-button
                expand="block"
                class="ion-no-margin"
                (click)="requestProof()"
              >
                <ion-icon name="send"></ion-icon>
                Request Certificate of Proof
              </ion-button>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ng-template #generic>
      <ion-title class="ios title-ios hydrated">Proof Certificates</ion-title>
    </ng-template>
    <ng-template #noProofs>
      <ion-card>
        <ion-card-content>
          There are no proofs loaded. Why don't you request one?
        </ion-card-content>
      </ion-card>
    </ng-template>
  `,
  styleUrls: ['./relationship-proofs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationshipProofsComponent implements OnInit {
  searchQuery: '';
  credentials: Observable<ICredentialResponse[]>;
  relationship$: Observable<IRelationship[]>;
  issuers: Observable<IIssuer[]>;
  proofs$: Observable<IProofResponse>;
  relId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public stateSvc: CredentialStateService,
    public relationshipStateSvc: RelationshipsStateService,
    private actionSvc: ProofActionService,
    private relationshipActionSvc: RelationshipsActionService,
    public actionSheetCtrl: ActionSheetController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // console.log('bool', bool);
    this.relId = this.route.snapshot.paramMap.get('did');
    this.credentials = this.stateSvc.credentials$;

    this.relationship$ = this.relationshipStateSvc.relationships$.pipe(
      map(obs => obs.filter(rel => rel._id === this.relId))
    );

    this.issuers = this.stateSvc.issuers$;

    this.proofs$ = this.actionSvc.getProofs().pipe(
      map(obs =>
        obs.filter(rel => rel.connectionId === this.relId).reduce(itm => itm)
      ),
      tap(obs => console.log(obs))
    );
  }

  async initializeItems() {
    // await this.actionSvc.getCertificates({
    //   did: this.route.snapshot.paramMap.get('did')
    // });
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

  async presentActionSheet(certId: string) {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'View Certificate',
          handler: () =>
            this.router.navigate(['/verify-credentials/view/' + certId])
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
  requestProof() {
    console.log('clicked');
    this.router.navigate([`/verify-credentials/issue/${this.relId}`]);
  }
}
