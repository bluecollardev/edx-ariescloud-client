import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {
  CredentialStateService,
  ICertificateOfProof
} from '../../../credentials/services/credential-state.service';
import {
  CredentialActionsService,
  ICertificateParams
} from '../../../credentials/services/credential-actions.service';

@Component({
  selector: 'app-view-proof',
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
        <ion-title class="ios title-ios hydrated"
          >Certificate of Proof</ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col sizeXs="12" sizeMd="8" pushMd="2" sizeXl="4" pushXl="4">
            <ion-card text-center>
              <img
                src="https://insidelatinamerica.net/wp-content/uploads/2018/01/noImg_2.jpg"
              />

              <ion-card-content>
                <ion-card-title *ngIf="active">
                  {{ active.name }}
                </ion-card-title>
              </ion-card-content>
              <ion-card-content>
                <p *ngIf="active">
                  <strong>Alice Cooper</strong> {{ active.name.toLowerCase() }}.
                </p>
              </ion-card-content>

              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                <ion-label>Status</ion-label>
                <ion-badge color="medium" item-end>Verified</ion-badge>
              </ion-item>

              <div style="display: flex; flex-direction: column">
                <ion-button
                  style="flex: 1"
                  color="primary"
                  clear
                  full
                  icon-start
                  margin
                  (click)="this.verifyCredPopup()"
                >
                  <ion-icon name="finger-print"></ion-icon>
                  Verify Claims
                </ion-button>
              </div>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./view-proof.component.scss']
})
export class ViewProofComponent implements OnInit {
  active: ICertificateOfProof;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private stateSvc: CredentialStateService,
    private actionSvc: CredentialActionsService,
    private alertController: AlertController
  ) {
    this.actionSvc.getCertificates(); // Load all credentials first
    this.actionSvc.getCertificate(this.route.snapshot.paramMap.get('id'));
    this.setActiveCertificate();
  }

  ngOnInit() {}

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
