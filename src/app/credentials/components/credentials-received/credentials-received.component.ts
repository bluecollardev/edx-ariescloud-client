import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';

import {
  ActionSheetController,
  AlertController,
  LoadingController
} from '@ionic/angular';

import { Observable } from 'rxjs';

import { HttpService } from '../../../core/services/http.service';

import {
  CredentialStateService,
  ICredential,
  IIssuer
} from '../../services/credential-state.service';

import {
  RelationshipsStateService,
  IRelationship
} from '../../../relationships/services/relationships-state.service';

import { CredentialActionsService } from '../../services/credential-actions.service';

import { map } from 'rxjs/operators';

const url = environment.apiUrl;

// TODO: Is there something that already exists for these states
const credentialStates = {
  request_sent: 'Request Sent',
  request_received: 'Request Received',
  offer_sent: 'Offer Sent',
  offer_received: 'Offer Received'
};

@Component({
  selector: 'app-credentials-received',
  template: `
    <ion-grid>
      <ion-row>
        <ion-col sizeXs="12" sizeMd="12" pushMd="12" sizeXl="8" pushXl="2">
          <ion-list
            *ngIf="credentials | async as issuerGroups"
          >
            <ion-list-header class="ion-no-margin ion-no-padding">
              <div style="display: flex; width: 100%; flex-direction: column">
                <span class="ion-padding">Accepted Credentials</span>
                <ion-searchbar></ion-searchbar>
              </div>
            </ion-list-header>
            <ion-item-sliding *ngFor="let issuer of issuerGroups">
              <ion-item
                (click)="
                  this.router.navigate([
                    '/credentials-received/group/' + issuer.did
                  ])
                "
              >
                <ion-icon name="person" class="icon-lg"></ion-icon>
                <ion-label>
                  <h2>{{ issuer.name }}</h2>
                  <small>DID: {{ issuer.did }}</small>
                </ion-label>
                <ion-badge color="primary" item-end>{{
                  issuer.credentials.length
                }}</ion-badge>
              </ion-item>
              <!--<ion-item-options>
                <ion-item-option color="danger" type="button" icon-start>
                  <ion-icon name="trash" class="icon-md"></ion-icon>
                  Delete
                </ion-item-option>
                <ion-item-option color="light" type="button" icon-start>
                  <ion-icon name="ios-eye-off" class="icon-md"></ion-icon>
                  Disable
                </ion-item-option>
              </ion-item-options>-->
            </ion-item-sliding>
          </ion-list>
          <ion-list
            *ngIf="pending$ | async as pendingCreds"
          >
            <ion-list-header>
              Accept New Credentials
            </ion-list-header>
            <ion-item-sliding *ngFor="let cred of pendingCreds">
              <ion-item
                (click)="pendingActionSheet(cred._id, cred.state)"
                [disabled]="!actionMap[cred.state]"
              >
                <!-- TODO: Implement multi-accept -->
                <!--<ion-checkbox (click)="handleSelect"></ion-checkbox>-->
                <ion-icon name="document" class="icon-lg"></ion-icon>
                <ion-label>
                  <h2>{{ cred.name || 'Unnamed Credential' }}</h2>
                  <!--<small>DID: {{ item.did }}</small>-->
                  <ion-row>
                    <small>State: {{ credentialStates[cred.state] }}</small>
                  </ion-row>
                  <ion-row>
                    <small>Created: {{ cred.created.toLocaleString().split(' ').shift() }}</small>
                  </ion-row>
                </ion-label>
              </ion-item>
              <!--<ion-item-options>
                <ion-item-option color="danger" type="button" icon-start>
                  <ion-icon name="ios-close" class="icon-md"></ion-icon>
                  Decline
                </ion-item-option>
                <ion-item-option color="success" type="button" icon-start>
                  <ion-icon name="ios-checkmark" class="icon-md"></ion-icon>
                  Accept
                </ion-item-option>
              </ion-item-options>-->
            </ion-item-sliding>
          </ion-list>
        </ion-col>
      </ion-row>
    </ion-grid>
  `,
  styleUrls: ['./credentials-received.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CredentialsReceivedComponent implements OnInit {
  searchQuery: '';
  credentials: Observable<ICredential[]>;
  pending$: Observable<IIssuer[]>;
  credentialStates: [];
  _url: string;
  _id: string;

  // TODO: Document these
  actionMap = {
    offer_received: true,
    offer_sent: false,
    request_received: true,
    request_sent: false,
    credential_received: true
  };

  constructor(
    public router: Router,
    public stateSvc: CredentialStateService,
    public relationshipStateSvc: RelationshipsStateService,
    private actionSvc: CredentialActionsService,
    public actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private httpSvc: HttpService,
    public loadingController: LoadingController,
    private http: HttpClient
  ) {
    this._url = url;
    // this.initializeItems();
    this.credentialStates = credentialStates;
  }

  async ngOnInit() {
    this.loadData();
    this.credentials = this.stateSvc.credentials$;
    this.pending$ = this.stateSvc.pending$;
    this.credentials.subscribe(obs => console.log(obs));
  }

  loadData() {
    this.stateSvc.credentials$ = this.http
      .get<ICredential[]>(`${this._url}credentials`)
      .pipe(map(obs => Array.from(new Set(obs))));

    this.stateSvc.pending$ = this.actionSvc.getPendingIssues();
  }

  async getItems(issuers, ev: any) {
    const filtered = [];
    // Reset items back to all of the items

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

  async pendingActionSheet(id: string, state: string) {
    if (!this.actionMap[state]) return;
    this._id = id;

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Accept',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Accepting credential stage',
              duration: 10000
            });
            await loading.present();
            try {
              const post = await this.httpSvc
                .postById('issues', this._id)
                .toPromise();
              if (post) {
                setTimeout(() => this.loadData(), 200);

                loading.dismiss();
                return true;
              }
            } catch {
              loading.dismiss();
              return false;
            }
          }
        },
        {
          text: 'Decline',
          handler: async () => {
            const rm = await this.httpSvc.delete('issues', this._id);
            return true;
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
        },
        {
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
        },
        {
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

  handleSelect(e) {
    alert();
    e.preventDefault();
    e.stopPropagation();
  }
}
