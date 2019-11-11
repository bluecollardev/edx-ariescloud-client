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

import { map, tap, reduce } from 'rxjs/operators';

const url = environment.apiUrl;

// TODO: Is there something that already exists for these states
const credentialStates = {
  request_sent: 'Request Sent',
  request_received: 'Request Received',
  offer_sent: 'Offer Sent',
  offer_received: 'Offer Received',
  credential_received: 'Credential Received'
};

export interface ICredentialResponse {
  _id: string;
  referent: string;
  attrs: {
    label: string;
    val: string;
  }[];
  schema_id: string;
  cred_def_id: string;
  rev_reg_id: string;
  cred_rev_id: string;
}

@Component({
  selector: 'app-credentials-received',
  template: `
    <ion-content>
      <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
        <ion-refresher-content> </ion-refresher-content>
      </ion-refresher>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-list *ngIf="credentials | async as creds">
              <ion-list-header class="ion-no-margin ion-no-padding">
                <div style="display: flex; width: 100%; flex-direction: column">
                  <span class="ion-padding">Accepted Credentials</span>
                </div>
              </ion-list-header>
              <ion-item-sliding *ngFor="let cred of creds">
                <ion-item (click)="navigate(cred._id)">
                  <ion-icon
                    name="ribbon"
                    color="tertiary"
                    class="icon-lg"
                  ></ion-icon>
                  <ion-list>
                    <ion-label
                      ><h2>{{ cred.name }}</h2></ion-label
                    >
                    <small>ID: {{ cred._id }}</small>
                    <ion-row>
                      <ion-chip *ngFor="let attr of cred.attrs" color="success">
                        <ion-icon
                          name="checkmark-circle"
                          color="primary"
                        ></ion-icon>
                        <ion-label>{{ attr.label }}|{{ attr.val }}</ion-label>
                      </ion-chip>
                    </ion-row>
                  </ion-list>
                </ion-item>
              </ion-item-sliding>
            </ion-list>
            <ion-list *ngIf="pending$ | async as pendingCreds">
              <ion-list-header>
                Accept New Credentials
              </ion-list-header>
              <ion-item-sliding *ngFor="let cred of pendingCreds">
                <ion-item
                  (click)="pendingActionSheet(cred._id, cred.state)"
                  [disabled]="!actionMap[cred.state]"
                >
                  <ion-icon name="document" class="icon-lg"></ion-icon>
                  <ion-list>
                    <ion-label>
                      <h2>{{ cred.name || 'Unnamed Credential' }}</h2>
                      <ion-row>
                        <small>State: {{ cred.state }}</small>
                      </ion-row>
                      <ion-row>
                        <small
                          >Created: {{ cred.created | date: 'short' }}</small
                        >
                      </ion-row>
                    </ion-label>
                  </ion-list>
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
  credentials: Observable<ICredentialResponse[]>;
  pending$: Observable<any[]>;
  credentialStates;
  _url: string;
  _id: string;

  // TODO: Document these
  actionMap = {
    offer_received: true,
    offer_sent: false,
    request_received: true,
    request_sent: false,
    credential_received: true,
    issued: true
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

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.pending$ = this.actionSvc.getPendingIssues().pipe(
      map(
        itms => {
          const arr = [];

          itms.forEach(val => {
            val.records.forEach(cred => arr.push(cred));
          });
          console.log(arr);
          return arr;
        }
        // itms.map(itm =>
        //   itm.records
        //     .map(record => ({
        //       _id: itm.credential_exchange_id,
        //       ...itm,
        //       ...record
        //     }))
        //     .reduce(itm => itm)
        // )
      ),
      tap(obs => console.log(obs))
    );
    this.credentials = this.actionSvc.getCredentials();

    // this.pending$ = this.stateSvc.pending$;
  }

  async pendingActionSheet(id: string, state: string) {
    if (!this.actionMap[state]) return;
    this._id = id;
    console.log(this._id);
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
                setTimeout(() => {
                  this.loadData();
                  loading.dismiss();
                  this.router.navigate(['/credentials/received']);
                }, 3000);

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

  navigate(id: string) {
    console.log(id);
    this.router.navigate(['/credentials/received/view/' + id]);
  }
  doRefresh(event) {
    setTimeout(() => {
      this.loadData();
      event.target.complete();
    }, 750);
  }
}
