import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap, flatMap, concat, merge, concatMap } from 'rxjs/operators';
import {
  CredentialStateService,
  ICertificateOfProof,
  IRequestedAttributes,
  IProof
} from '../../../credentials/services/credential-state.service';
import {
  CredentialActionsService,
  ICertificateParams
} from '../../../credentials/services/credential-actions.service';
import { ProofActionService } from '../../services/proof-action.service';
import { RelationshipActionsService } from 'src/app/credentials/services/relationship-actions.service';
import { of } from 'rxjs';

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
          <ion-item>
            <ion-card-title>
              {{ proof.label }}
            </ion-card-title>
          </ion-item>
          <p *ngIf="active">
            <strong>Alice Cooper</strong>
            {{ active.name.toLowerCase() }}.
          </p>

          <ion-item>
            <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
            <ion-label>Status</ion-label>
            <ion-badge color="secondary" item-end>{{ proof.state }}</ion-badge>
          </ion-item>
        </ion-list>
        <ion-item
          (click)="verifyCredPopup()"
          lines="none"
          color="primary"
          detail
          detailIcon="finger-print"
        >
          <ion-label>Verify</ion-label>
        </ion-item>
      </ion-card>
    </ion-content>
  `,
  styleUrls: ['./view-proof.component.scss']
})
export class ViewProofComponent implements OnInit {
  active: ICertificateOfProof;
  proof$: any;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private stateSvc: CredentialStateService,
    private actionSvc: ProofActionService,
    private alertController: AlertController,
    private relActionSvc: RelationshipActionsService
  ) {}

  ngOnInit() {
    this.proof$ = this.actionSvc
      .getProof(this.route.snapshot.paramMap.get('id'))
      .pipe(
        map(proof => {
          const {
            presentation_request: { requested_attributes },
            ...noRequestedAttributes
          } = proof;
          const reqKeys = (req: IRequestedAttributes) =>
            [...Object.keys(req)].map(key => ({ key, ...req[key] }));
          const resKeys = (obj: { [key: string]: string }) =>
            [...Object.keys(obj)].map(key => ({ key, value: obj[key] }));

          const attrs = reqKeys(requested_attributes).map(attr => ({
            restrictions: resKeys(attr.restrictions),
            ...attr
          }));

          return {
            mappedAttributes: attrs,
            ...noRequestedAttributes
          };
        }),
        concatMap(
          proof => this.relActionSvc.getRelationshipById(proof.connection_id),
          proof => proof
        ),
        tap(obs => console.log(obs))
      );
  }

  async setActiveCertificate() {
    this.stateSvc.activeCertificateOfProof$
      .pipe(
        map(is => {
          return is.filter(
            (i: any) => i._id === this.route.snapshot.paramMap.get('id')
          )[0];
        })
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
