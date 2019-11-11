import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import {
  map,
  tap,
  flatMap,
  concat,
  merge,
  concatMap,
  take,
} from 'rxjs/operators';
import {
  CredentialStateService,
  ICertificateOfProof,
  IRequestedAttributes,
  IProof,
} from '../../../credentials/services/credential-state.service';
import {
  CredentialActionsService,
  ICertificateParams,
} from '../../../credentials/services/credential-actions.service';
import { ProofActionService } from '../../services/proof-action.service';
import { RelationshipActionsService } from 'src/app/credentials/services/relationship-actions.service';
import { of, Observable } from 'rxjs';
import { IRelationship } from 'src/app/messages/services/messages-state.service';

@Component({
  selector: 'app-view-proof',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons
          slot="start"
          class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated"
        >
          <ion-back-button defaultHref="/verify-credentials"></ion-back-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated"
          >Certificate of Proof</ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen color="light">
      <ion-card text-center *ngIf="proof$ | async as proof">
        <img
          src="https://insidelatinamerica.net/wp-content/uploads/2018/01/noImg_2.jpg"
        />

        <ion-list>
          <ion-card-title>
            <h2 *ngIf="relationship$ | async as rel">
              {{ rel.name }}
            </h2>
          </ion-card-title>
          <ion-item>
            <ion-label>Status</ion-label>
            <ion-badge color="secondary" item-end>{{
              proof.state | titlecase
            }}</ion-badge>
          </ion-item>
          <ion-item>
            <ion-label>Role</ion-label>
            <ion-badge color="secondary" item-end>{{
              getRole(proof.role) | titlecase
            }}</ion-badge>
          </ion-item>
          <ng-container *ngFor="let request of proof.mappedAttributes">
            <ion-list-header>
              <ion-title>
                {{ request.name }}
              </ion-title>
            </ion-list-header>
            <ion-item-divider color="medium">
              <ion-label>
                Restrictions
              </ion-label>
            </ion-item-divider>
            <app-list-item
              *ngFor="let restrict of request.restrictions"
              [label]="restrict.key"
              [value]="restrict.value"
            >
            </app-list-item>
          </ng-container>
        </ion-list>
        <ion-item (click)="verifyCredPopup()" lines="none" color="primary">
          <ion-badge slot="end">Verify</ion-badge>
        </ion-item>
      </ion-card>
    </ion-content>
  `,
  styleUrls: ['./view-proof.component.scss'],
})
export class ViewProofComponent implements OnInit {
  active: ICertificateOfProof;
  proof$: any;
  relationship$: Observable<IRelationship>;

  getRole(role: string) {
    return role === 'verifier' ? 'verifier' : 'issuer';
  }

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private stateSvc: CredentialStateService,
    private actionSvc: ProofActionService,
    private alertController: AlertController,
    private relActionSvc: RelationshipActionsService,
  ) {}

  ngOnInit() {
    this.proof$ = this.actionSvc
      .getProof(this.route.snapshot.paramMap.get('id'))
      .pipe(
        map(proof => {
          const {
            presentation_request: { requested_attributes },
            state,
            ...noRequestedAttributes
          } = proof;
          const reqKeys = (req: IRequestedAttributes) =>
            [...Object.keys(req)].map(key => ({ key, ...req[key] }));

          const attrs = reqKeys(requested_attributes).map(attr => ({
            key: attr.key,
            name: attr.name,
            restrictions: [...Object.keys(attr.restrictions)].map(key => ({
              key,
              value: attr.restrictions[key],
            })),
          }));
          console.log(attrs);

          return {
            mappedAttributes: attrs,
            state: state.replace(/_/g, ' '),
            ...noRequestedAttributes,
          };
        }),
      );
    this.proof$.pipe(take(1)).subscribe(proof => {
      this.relationship$ = this.relActionSvc.getRelationshipById(
        proof.connection_id,
      );
      console.log(proof);
    });
  }

  async setActiveCertificate() {
    this.stateSvc.activeCertificateOfProof$
      .pipe(
        map(is => {
          return is.filter(
            (i: any) => i._id === this.route.snapshot.paramMap.get('id'),
          )[0];
        }),
      )
      .subscribe(certificate => {
        this.active = certificate;
      });
  }

  async verifyCredPopup() {
    const alert = await this.alertController.create({
      header: 'Certificate Claims Verified',
      message:
        '<strong>Success!</strong> All claims within this certificate are valid.',
      buttons: [
        {
          text: 'Back',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.router.navigate(['/verify-credentials']);
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
