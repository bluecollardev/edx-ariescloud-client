import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router} from '@angular/router';

import { CredentialStateService } from '../credentials/services/credential-state.service';
import { CredentialActionsService } from '../credentials/services/credential-actions.service';

@Component({
  selector: 'app-credentials',
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
        <ion-title class="ios title-ios hydrated">Verify Credentials</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col sizeXs="12" sizeMd="12" pushMd="12" sizeXl="8" pushXl="2">
            <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>
            <ion-list *ngFor="let item of items.slice(0,1)">
              <ion-list-header>
                {{ item }}
              </ion-list-header>
              <ion-item-sliding>
                <ion-item>
                  <ion-icon name="business" class="icon-lg"></ion-icon>
                  <ion-label>
                    <h2>{{ item }}</h2>
                    <small>DID: abcd-1234-df34-cd34</small>
                  </ion-label>
                </ion-item>
                <!--<ion-item-options>
                  <button ion-button color="light" icon-start>
                    <ion-icon name="ios-share" class="icon-md"></ion-icon> Share
                  </button>
                </ion-item-options>-->
              </ion-item-sliding>
            </ion-list>

            <ion-grid style="width: 100%;">
              <ion-row>
                <ion-col>
                  <ion-list-header>
                    <ion-label>Credentials Shared With Me</ion-label>
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
                  <ion-card text-center (click)="presentActionSheet()">
                    <ion-card-header>
                      {{ cred.issuedTo }}
                    </ion-card-header>
                    <ion-icon name="document" class="icon-lg"></ion-icon>
                    <ion-card-content>
                      <small><strong>{{ cred.name }}</strong></small>
                      <br />
                      <small>{{ cred.issuedBy }}</small>
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
  styleUrls: ['./proofs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProofsComponent implements OnInit {
  searchQuery: '';
  items: string[];
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
    this.items = ['Faber University', 'ACME Inc.'];
    await this.actionSvc.loadCredDefs();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.items = this.items.filter(item => {
        return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'View',
          handler: () => this.router.navigate(['/credentials-received/view'])
        },
        {
          text: 'Verify',
          handler: () => {
            this.verifyCredPopup();
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

  async verifyCredPopup() {
    const alert = await this.alertController.create({
      header: 'Verifying Credential',
      message: '<strong>Success!</strong> This credential is valid.',
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
          }
        }
      ]
    });

    await alert.present();
  }
}
