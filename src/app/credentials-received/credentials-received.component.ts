import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CredentialStateService, ICredential, IIssuer } from '../credentials/services/credential-state.service';
import { RelationshipsStateService, IRelationship } from '../relationships/services/relationships-state.service';
import { CredentialActionsService } from '../credentials/services/credential-actions.service';
import { RelationshipsActionService } from '../relationships/services/relationships-action.service';

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
        <ion-row>
          <ion-col sizeXs="12" sizeMd="12" pushMd="12" sizeXl="8" pushXl="2">
            <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>
          </ion-col>
        </ion-row>
        <ion-row *ngIf="stateSvc.issuers$ | async as issuerGroups">
          <ion-col sizeXs="12" sizeMd="12" pushMd="12" sizeXl="8" pushXl="2">
            <ion-list>
              <ion-item-sliding *ngFor="let issuer of issuerGroups" (click)="this.router.navigate(['/credentials-received/group/' + issuer.did])">
                <ion-item>
                  <ion-icon name="business" class="icon-lg"></ion-icon>
                  <ion-label>
                    <h2>{{ issuer.name }}</h2>
                    <small>DID: {{ issuer.did }}</small>
                  </ion-label>
                  <ion-badge color="primary" item-end>2</ion-badge>
                </ion-item>
              </ion-item-sliding>
            </ion-list>
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
  credentials: Observable<ICredential[]>;
  relationships: Observable<IRelationship[]>;
  issuers: Observable<IIssuer[]>;

  constructor(
    private router: Router,
    public stateSvc: CredentialStateService,
    public relationshipStateSvc: RelationshipsStateService,
    private actionSvc: CredentialActionsService,
    private relationshipActionSvc: RelationshipsActionService,
    public actionSheetCtrl: ActionSheetController,
    private alertController: AlertController
  ) {
    this.initializeItems();
  }

  ngOnInit() {
    this.stateSvc.ready.subscribe(bool => {
      console.log('subscribing to service observables');
      // console.log('bool', bool)
      if (bool) {
        this.credentials = this.stateSvc.credentials$;
        this.credentials.subscribe(obs => {
          console.log('credentials loaded');
          console.log(obs);
        });

        this.relationships = this.relationshipStateSvc.relationships$;
        this.relationships.subscribe(obs => {
          console.log('relationships loaded');
          console.log(obs);
        });

        this.issuers = this.stateSvc.issuers$;
        this.issuers.subscribe(obs => {
          console.log('issuers loaded');
          console.log(obs);
        });
      }
    });
  }

  async initializeItems() {
    await this.actionSvc.getCredentials();
  }

  async getItems(issuers, ev: any) {
    const filtered = [];
    // Reset items back to all of the items
    await this.initializeItems();

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
            this.shareCredPopup();
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
