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
  IProofResponse,
  ProofStateType,
} from '../../../credentials/services/credential-state.service';
import {
  RelationshipsStateService,
  IRelationship,
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
        <ion-buttons
          slot="start"
          class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated"
        >
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title
          class="ios title-ios hydrated"
          *ngIf="proofs$ | async as proofs; else generic"
          >{{ proofs.label }}'s Proof Certificates</ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <!--
    <ion-item-divider color="primary"
    ><ion-label>Proof Certificates</ion-label></ion-item-divider
  >
  -->
      <ng-container *ngIf="proofs$ | async as record; else noProofs">
        <ion-list>
          <ion-list-header>
            <h2>Proofs</h2>
          </ion-list-header>

          <ion-item
            *ngFor="let proof of record.proofs"
            (click)="presentActionSheet(proof._id)"
          >
            <ion-icon [name]="roleIcon(proof.role)" slot="start"></ion-icon>
            <ion-label>
              <ng-container
                *ngFor="
                  let req of proof.requested;
                  first as isFirst;
                  last as isLast
                "
              >
                <h2 *ngIf="isFirst && req.length < 1">
                  {{ req.name | titlecase }}
                </h2>
                <h2 *ngIf="isFirst && req.length > 0">
                  {{ req.name | titlecase }},
                </h2>

                <h2 *ngIf="isLast">{{ req.name | titlecase }}</h2>
              </ng-container>
              <h3>{{ proof.formattedState | titlecase }}</h3>
              <p>{{ formattedRequests(proof.requested) }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ng-container>
      <!--

      <ion-grid>
        <ion-row *ngIf="proofs$ | async as proofs">
          <ion-col>
            <ion-grid style="width: 100%;">
              <ion-row *ngIf="proofs.proofs.length > 0; else noProofs">
                <ion-col *ngFor="let certificate of proofs.proofs">
                  <ion-card
                    (click)="presentActionSheet(certificate._id)"
                    no-padding
                  >
                    <img
                      src="https://insidelatinamerica.net/wp-content/uploads/2018/01/noImg_2.jpg"
                    />

                    <ion-card-content>
                      <app-chip
                        [label]="certificate.initiator"
                        icon="people"
                        iconColor="primary"
                        labelColor="primary"
                        color="dark"
                      >
                      </app-chip>
                      <app-chip
                        [label]="certificate.formattedState"
                        [icon]="stateIcon(certificate.state)"
                        iconColor="primary"
                        labelColor="primary"
                        color="primary"
                      >
                      </app-chip>
                      <app-chip
                        [label]="fixRole(certificate.role)"
                        icon="at"
                        iconColor="secondary"
                        labelColor="secondary"
                        color="secondary"
                      >
                      </app-chip>
                      <app-chip
                        label="{{ certificate.created | date: 'short' }}"
                        icon="time"
                        iconColor="secondary"
                        labelColor="secondary"
                        color="secondary"
                      >
                      </app-chip>
                      <ion-list>
                        <ng-container
                          *ngFor="let request of certificate.requested"
                        >
                          <ion-item-divider color="dark">
                            <ion-label>
                              Restrictions
                            </ion-label>
                          </ion-item-divider>
                          <ion-item>
                            <ion-row>
                              <ion-col>
                                <ion-note color="dark">Name:</ion-note>
                              </ion-col>
                              <ion-col>
                                <ion-note>{{ request.name }}</ion-note>
                              </ion-col>
                            </ion-row>
                          </ion-item>

                          <ion-item
                            *ngFor="
                              let restriction of request.mappedRestrictions
                            "
                          >
                            <ion-row>
                              <ion-col>
                                <ion-note color="dark"
                                  >{{ restriction.type }}:
                                </ion-note>
                              </ion-col>
                              <ion-col>
                                <ion-note>{{ restriction.val }}</ion-note>
                              </ion-col>
                            </ion-row>
                          </ion-item>
                        </ng-container>
                      </ion-list>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
              </ion-row>
            </ion-grid>

          </ion-col>
        </ion-row>
      </ion-grid>
            -->

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelationshipProofsComponent implements OnInit {
  id: string;
  searchQuery: '';
  credentials: Observable<ICredentialResponse[]>;
  // relationship$: Observable<IRelationship[]>;
  issuers: Observable<IIssuer[]>;
  proofs$: Observable<IProofResponse>;
  relId: string;

  fixRole(role: string) {
    return role ? role : 'prover';
  }

  roleIcon(role: string) {
    return role === 'verifier' ? 'search' : 'wallet';
  }

  stateIcon(state: ProofStateType) {
    return state === 'verified' ? 'cloud-done' : 'hourglass';
  }

  formattedRequests(req: any[]) {
    return req.length > 1 ? `${req.length} requests` : '1 request';
  }

  restrictionsMap(res: { [key: string]: string }) {
    const mapped = Object.keys(res).map(key => ({
      type: key,
      val: res[key],
    }));
    return mapped;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public stateSvc: CredentialStateService,
    public relationshipStateSvc: RelationshipsStateService,
    private actionSvc: ProofActionService,
    public actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    this.relId = this.route.snapshot.paramMap.get('did');
    this.credentials = this.stateSvc.credentials$;

    this.issuers = this.stateSvc.issuers$;

    this.proofs$ = this.actionSvc.getProofs().pipe(
      map(obs =>
        obs.filter(rel => rel.connectionId === this.relId).reduce(itm => itm),
      ),
      map(obs => {
        const mappedProof = obs.proofs.map(proof => {
          const newProof = { ...proof };
          const { state } = proof;
          const formatted = proof.state.replace(/_/g, ' ');

          newProof.requested = proof.requested.map(req => ({
            mappedRestrictions: this.restrictionsMap(req.restrictions),
            ...req,
          }));
          newProof.formattedState = formatted;
          return newProof;
        });
        const { proofs, ...noProofs } = obs;
        return {
          proofs: mappedProof,
          ...noProofs,
        };
      }),
      tap(obs => console.log(obs)),
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

  async presentActionSheet(id: string) {
    this.id = id;
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'View Certificate',
          handler: () =>
            this.router.navigate(['/verify-credentials/view/' + this.id]),
        },
        // {
        //   text: 'Verify Certificate Claims',
        //   handler: () => {
        //     this.verifyCredPopup();
        //   }
        // },
        {
          text: 'Delete Certificate',
          role: 'destructive',
          handler: () => {
            console.log('Delete clicked');
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
  requestProof() {
    console.log('clicked');
    this.router.navigate([`/verify-credentials/issue/${this.relId}`]);
  }
}
