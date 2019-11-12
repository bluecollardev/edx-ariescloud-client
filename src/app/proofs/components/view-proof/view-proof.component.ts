import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
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

    <ion-content fullscreen color="light" *ngIf="proof$ | async as proof">
      <ion-fab vertical="top" horizontal="end" slot="fixed">
        <ion-fab-button
          [disabled]="disabled"
          (click)="actions(proof.presentation_exchange_id)"
        >
          <ion-icon [name]="button"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-card text-center>
        <img
          src="https://insidelatinamerica.net/wp-content/uploads/2018/01/noImg_2.jpg"
        />

        <ion-list>
          <ion-item>
            <app-chip icon="at" [label]="proof.initiator" color="tertiary">
            </app-chip>
            <app-chip
              icon="time"
              label="{{ proof.created_at | date: 'short' }}"
              color="tertiary"
            >
            </app-chip>
          </ion-item>
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
            <ion-item>
              <ion-icon slot="start" name="key"> </ion-icon>
              <ion-label>
                {{ request.key }}
              </ion-label>
            </ion-item>

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
      </ion-card>
    </ion-content>
  `,
  styleUrls: ['./view-proof.component.scss'],
})
export class ViewProofComponent implements OnInit {
  active: ICertificateOfProof;
  proof$: any;
  relationship$: Observable<IRelationship>;
  state: string;
  role: string;

  get button() {
    return this.state === 'verifier' ? 'search' : 'wallet';
  }

  get disabled() {
    const disabledStates = ['request_sent', 'proposal_sent'];
    return disabledStates.some(val => val === this.state);
  }

  actionMap(state: string) {
    console.log(state);
    return this.state[state.replace(/ /g, '_')].label;
  }

  getRole(role: string) {
    return role === 'verifier' ? 'verifier' : 'prover';
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
          this.state = state;
          this.role = noRequestedAttributes.role || 'prover';
          const reqKeys = (req: IRequestedAttributes) =>
            [...Object.keys(req)].map(key => ({ key, ...req[key] }));

          const attrs = reqKeys(requested_attributes).map(attr => ({
            key: attr.key,
            name: attr.name,
            restrictions: [...Object.keys(attr.restrictions[0])].map(key => ({
              key,
              value: attr.restrictions[0][key],
            })),
          }));
          return {
            mappedAttributes: attrs,
            state: state.replace(/_/g, ' '),
            ...noRequestedAttributes,
          };
        }),
      );
    this.proof$.pipe(take(1)).subscribe(proof => {
      console.log(proof);
      this.relationship$ = this.relActionSvc.getRelationshipById(
        proof.connection_id,
      );
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

  async actions(id: string) {
    const state = this.state;
    if (state === 'request_received') {
      return this.router.navigate(['/verify-credentials/claims/' + id]);
    }
    if (state === 'presentation_received') {
      const res = await this.actionSvc.postProofById({}, id).toPromise();
      console.log(res);
      if (res) return this.router.navigate(['/verify-credentials/']);
      else return console.log('err');
    }
  }
}
