import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-credential',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons slot="start" class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated">
          <ion-menu-button class="hydrated ios button ion-activatable ion-focusable activated"></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">Messages - ACME Inc.</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col sizeXs="12" sizeMd="8" pushMd="2" sizeXl="4" pushXl="4">
            <ion-card text-center>
              <ion-card-content>
                <ion-card-title>
                  <small><small>Certificate of Proof Request</small></small>
                </ion-card-title>
              </ion-card-content>
              <ion-card-content>
                <p>
                  <strong>ACME Inc.</strong> requested proof that Alice Cooper has a university degree from an accredited institution.
                </p>
              </ion-card-content>
              
              <div style="display: flex; flex-direction: column">
                <ion-button
                  style="flex: 1"
                  color="primary"
                  clear
                  full
                  icon-start
                  margin
                  (click)="this.provideProofPopup()"
                >
                  <ion-icon name="share-alt"></ion-icon>
                  Respond
                </ion-button>
              </div>
            </ion-card>
            <ion-card text-center>
              <ion-card-content>
                <ion-card-title>
                  <small><small>Invitation to Connect</small></small>
                </ion-card-title>
              </ion-card-content>
              <ion-card-content>
                <p>
                  <strong>ACME Inc.</strong> would like to connect.
                </p>
              </ion-card-content>
              
              <div style="display: flex; flex-direction: column">
                <ion-button
                  aria-disabled="true" 
                  disabled
                  style="flex: 1"
                  color="light"
                  clear
                  full
                  icon-start
                  margin
                  (click)="this.provideProofPopup()"
                >
                  <ion-icon name="checkmark"></ion-icon>
                  Invitation Accepted
                </ion-button>
              </div>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./relationship-messages.component.scss']
})
export class RelationshipMessagesComponent implements OnInit {
  graduationDate: string = new Date().toDateString()

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
  }

  async provideProofPopup() {
    console.log(arguments);
    const alert = await this.alertController.create({
      header: 'Provide Proof',
      message: 'Please select what proof you want to provide.',
      inputs: [
        {
          name: 'checkbox1',
          type: 'checkbox',
          label: 'Bachelor\'s of Science Degree',
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
            this.proofProvidedPopup();
          }
        }
      ]
    });

    await alert.present();
  }

  async proofProvidedPopup() {
    const alert = await this.alertController.create({
      header: 'Certificate of Proof Was Shared',
      message: 'Success! A certificate of proof was shared with ACME Inc.',
      buttons: [
        {
          text: 'Back',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.router.navigate(['/messages/view']);
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
