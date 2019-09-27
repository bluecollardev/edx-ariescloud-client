import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { CredentialStateService } from '../credentials/services/credential-state.service';
import { CredentialActionsService } from '../credentials/services/credential-actions.service';

@Component({
  selector: 'app-credentials-received',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons
          slot="start"
          class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated"
        >
          <ion-menu-button
            class="hydrated ios button ion-activatable ion-focusable activated"
          ></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">My Credentials</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row *ngIf="stateSvc.issuers | async as issuers">
          <ion-col sizeXs="12" sizeMd="12" pushMd="12" sizeXl="8" pushXl="2">
            <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>
            <ion-list *ngFor="let issuer of issuers">
              <ion-list-header>
                {{ issuer.type }}
              </ion-list-header>
              <ion-item-sliding>
                <ion-item>
                  <ion-icon name="business" class="icon-lg"></ion-icon>
                  <ion-label>
                    <h2>{{ issuer.name }}</h2>
                    <small>DID: {{ issuer.did }}</small>
                  </ion-label>
                </ion-item>
              </ion-item-sliding>
            </ion-list>

            <ion-grid style="width: 100%;">
              <ion-row>
                <ion-col>
                  <ion-list-header>
                    <ion-label>My Credentials</ion-label>
                  </ion-list-header>
                </ion-col>
              </ion-row>
              <ion-row *ngIf="stateSvc.credentials | async as creds">
                <ion-col
                  *ngFor="let cred of creds"
                  sizeXs="6"
                  sizeSm="4"
                  sizeMd="3"
                  sizeLg="2"
                >
                  <ion-card text-center (click)="this.presentActionSheet()">
                    <ion-card-header>
                      {{ cred.issuedBy }}
                    </ion-card-header>
                    <ion-icon name="document" class="icon-lg"></ion-icon>
                    <ion-card-content>
                      <small><strong>{{ cred.name }}</strong></small>
                      <br />
                      <small>{{ cred.program }}</small>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./credentials-received.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CredentialsReceivedComponent implements OnInit {
  searchQuery: '';
  issuers: string[];
  credentials: any[];

  constructor(
    private router: Router,
    public stateSvc: CredentialStateService,
    private actionSvc: CredentialActionsService,
    public actionSheetCtrl: ActionSheetController,
    private alertController: AlertController
  ) {
    this.initializeItems();
  }

  ngOnInit() {}

  async initializeItems() {
    await this.actionSvc.loadCredDefs();
    this.issuers = [];
  }

  getItems(issuers, ev: any) {
    let filtered = [];
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.issuers = this.issuers.filter(item => {
        return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }

    return filtered;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'View',
          handler: () => this.router.navigate(['/credentials-received/view'])
        },
        {
          text: 'Share',
          handler: () => {
            this.shareCredPopup()
          }
        },
        {
          text: 'Delete',
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
