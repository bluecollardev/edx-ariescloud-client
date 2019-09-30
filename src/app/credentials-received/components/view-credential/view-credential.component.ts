import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CredentialStateService, ICredential } from '../../../credentials/services/credential-state.service';
import { CredentialActionsService } from '../../../credentials/services/credential-actions.service';

// import { ICredentialResponse } from '../../models/i-credential';

@Component({
  selector: 'app-view-credential',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons slot="start" class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated">
          <ion-menu-button class="hydrated ios button ion-activatable ion-focusable activated"></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">My Credential</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col sizeXs="12" sizeMd="8" pushMd="2" sizeXl="4" pushXl="4">
            <ion-card text-center>
              <img src="https://insidelatinamerica.net/wp-content/uploads/2018/01/noImg_2.jpg"/>

              <ion-card-content>
                <ion-card-title>
                  {{ active.name }}
                  <br />
                  <div style="text-align: left; max-width: 60%; margin: 0 auto">
                    <small><small><small>Issued by:</small> {{ active.issuedBy }}</small></small>
                    <!--<br />
                    <small><small><small>Issued to:</small> Alice Cooper</small></small>-->
                  </div>
                </ion-card-title>
              </ion-card-content>
              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                <ion-label>Date Issued</ion-label>
                <ion-badge color="medium" item-end>{{ active.dateIssued.toDateString() }}</ion-badge>
              </ion-item>

              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='musical-notes' item-start style="color: #d03e84"></ion-icon>-->
                <ion-label>Degree</ion-label>
                <ion-badge color="medium" item-end>{{ active.name }}</ion-badge>
              </ion-item>
              
              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='musical-notes' item-start style="color: #d03e84"></ion-icon>-->
                <ion-label>Program</ion-label>
                <ion-badge color="medium" item-end>{{ active.program }}</ion-badge>
              </ion-item>

              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                <ion-label>GPA</ion-label>
                <ion-badge color="medium" item-end>3.8 / 4.0</ion-badge>
              </ion-item>

              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                <ion-label>Status</ion-label>
                <ion-badge color="medium" item-end>{{ active.status }}</ion-badge>
              </ion-item>

              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                <ion-label>SSN</ion-label>
                <ion-badge color="medium" item-end>abcd-1234-xyz</ion-badge>
              </ion-item>

              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='musical-notes' item-start style="color: #d03e84"></ion-icon>-->
                <ion-label>Document Version</ion-label>
                <ion-badge color="medium" item-end>{{ active.version }}</ion-badge>
              </ion-item>

              <div style="display: flex; flex-direction: column">
                <ion-button
                  style="flex: 1"
                  color="primary"
                  clear
                  full
                  icon-start
                  margin
                  (click)="this.shareCredPopup()"
                >
                  <ion-icon name="share"></ion-icon>
                  Share Credential
                </ion-button>
              </div>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./view-credential.component.scss']
})
export class ViewCredentialComponent implements OnInit {
  active: ICredential;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private stateSvc: CredentialStateService,
    private actionSvc: CredentialActionsService,
    private alertController: AlertController
  ) {
    this.actionSvc.getCredentials(); // Load all credentials first
    this.actionSvc.getCredential(this.route.snapshot.paramMap.get('id'));
    this.setActiveCred();
  }

  ngOnInit() {
  }

  async setActiveCred() {
    this.stateSvc.activeCredential$.pipe(
      map(is => {
        return is.filter((i) => i.id === this.route.snapshot.paramMap.get('id'))[0];
      })
    ).subscribe((credential) => {
      this.active = credential;
    });
  }

  async shareCredPopup() {
    const alert = await this.alertController.create({
      header: 'Share Credential',
      message: 'Please choose a relationship to share this credential with.',
      inputs: [
        {
          name: 'checkbox1',
          type: 'checkbox',
          label: 'ACME Inc.',
          value: 'value1',
          checked: false
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
            this.selectDataPopup();
          }
        }
      ]
    });

    await alert.present();
  }

  async selectDataPopup() {
    const alert = await this.alertController.create({
      header: 'Select Data',
      message: 'Please select what information you want to share.',
      inputs: [
        {
          name: 'checkbox1',
          type: 'checkbox',
          label: 'Degree',
          value: 'value1',
          checked: false
        },
        {
          name: 'checkbox2',
          type: 'checkbox',
          label: 'Program',
          value: 'value2',
          checked: false
        },
        {
          name: 'checkbox3',
          type: 'checkbox',
          label: 'Date of Study',
          value: 'value3',
          checked: false
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
            this.credSharedPopup();
          }
        }
      ]
    });

    await alert.present();
  }

  async credSharedPopup() {
    const alert = await this.alertController.create({
      header: 'Credential Shared',
      message: 'Success! Your credential was shared with ACME Inc.',
      buttons: [
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
