import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-credential',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons slot="end" class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated">
          <ion-menu-button class="hydrated ios button ion-activatable ion-focusable activated"></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">Messages - ACME Inc.</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col >
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
              
              <div style="display: flex">
                <ion-button
                  style="flex: 1"
                  color="light"
                  clear
                  full
                  icon-start
                  margin
                >
                  <ion-icon name="close"></ion-icon>
                  Decline
                </ion-button>
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
                  Provide
                </ion-button>
              </div>
            </ion-card>
            <ion-card text-center>
              <ion-card-content>
                <ion-card-title>
                  <small><small>Accept Credential from ACME Inc.</small></small>
                </ion-card-title>
              </ion-card-content>
              <ion-card-content>
                <p>
                  <strong>ACME Inc.</strong> has issued you the following credential: <i>Agile Coaching Certificate</i>.
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
                >
                  <ion-icon name="checkmark"></ion-icon>
                  Credential Accepted
                </ion-button>
              </div>
            </ion-card>
            <ion-card text-center>
              <ion-card-content>
                <ion-card-title>
                  <small><small>Accept Credential from ACME Inc.</small></small>
                </ion-card-title>
              </ion-card-content>
              <ion-card-content>
                <p>
                  <strong>ACME Inc.</strong> has issued you the following credential: <i>JavaScript Programmer Certificate</i>.
                </p>
              </ion-card-content>
              
              <div style="display: flex">
                <ion-button
                  style="flex: 1"
                  color="light"
                  clear
                  full
                  icon-start
                  margin
                >
                  <ion-icon name="close"></ion-icon>
                  Decline
                </ion-button>
                <ion-button
                  style="flex: 1"
                  color="success"
                  clear
                  full
                  icon-start
                  margin
                  (click)="this.displayToast('Success! Your credential was accepted.')"
                >
                  <ion-icon name="checkmark"></ion-icon>
                  Accept
                </ion-button>
              </div>
            </ion-card>
            <ion-card text-center>
              <ion-card-content>
                <ion-card-title>
                  <small><small>Certificate of Proof Request</small></small>
                </ion-card-title>
              </ion-card-content>
              <ion-card-content>
                <p>
                  <strong>ACME Inc.</strong> requested proof that Alice Cooper has a Computer Science degree from an accredited institution.
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
                >
                  <ion-icon name="close"></ion-icon>
                  Request Declined
                </ion-button>
              </div>
            </ion-card>
            <!--<ion-card text-center>
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
                >
                  <ion-icon name="checkmark"></ion-icon>
                  Invitation Accepted
                </ion-button>
              </div>
            </ion-card>-->
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
    private alertController: AlertController,
    private toastController: ToastController
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

  async displayToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      buttons: [
        {
          side: 'start',
          icon: 'information-circle'
        }
      ],
      duration: 2000
    });

    toast.present();
  }
}
