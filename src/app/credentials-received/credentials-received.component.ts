import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  LoadingController
} from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import {
  CredentialStateService,
  ICredential,
  IIssuer
} from '../credentials/services/credential-state.service';
import {
  RelationshipsStateService,
  IRelationship
} from '../relationships/services/relationships-state.service';
import { CredentialActionsService } from '../credentials/services/credential-actions.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpService } from '../core/services/http.service';

const url = environment.apiUrl;

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
        <ion-row><h5>Issued to Me</h5></ion-row>
        <ion-row *ngIf="credentials | async as issuerGroups">
          <ion-col sizeXs="12" sizeMd="12" pushMd="12" sizeXl="8" pushXl="2">
            <ion-list>
              <ion-item-sliding
                *ngFor="let issuer of issuerGroups"
                (click)="
                  this.router.navigate([
                    '/credentials-received/group/' + issuer.did
                  ])
                "
              >
                <ion-item>
                  <ion-icon name="business" class="icon-lg"></ion-icon>
                  <ion-label>
                    <h2>{{ issuer.name }}</h2>
                    <small>DID: {{ issuer.did }}</small>
                  </ion-label>
                  <ion-badge color="primary" item-end>{{
                    issuer.credentials.length
                  }}</ion-badge>
                </ion-item>
              </ion-item-sliding>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-grid>
        <ng-container *ngIf="pending$ | async as pendingCreds">
          <ion-row><h5>Pending</h5></ion-row>
          <ion-row>
            <ion-col sizeXs="12" sizeMd="12" pushMd="12" sizeXl="8" pushXl="2">
              <ion-list>
                <ion-item-sliding
                  *ngFor="let cred of pendingCreds"
                  (click)="pendingActionSheet(cred._id)"
                >
                  <ion-item>
                    <ion-icon name="business" class="icon-lg"></ion-icon>
                    <ion-label>
                      <h2>{{ cred.name }}</h2>
                      <small>STATE: {{ cred.state }}</small>
                    </ion-label>
                  </ion-item>
                </ion-item-sliding>
              </ion-list>
            </ion-col>
          </ion-row>
        </ng-container>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./credentials-received.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CredentialsReceivedComponent implements OnInit {
  searchQuery: '';
  credentials: Observable<ICredential[]>;
  pending$: Observable<IIssuer[]>;
  _url: string;

  actionMap = {
    offer_received: true,
    offer_sent: false,
    request_received: true,
    request_sent: false
  };
  _id: string;

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
  }

  async ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.stateSvc.credentials$ = this.http.get<ICredential[]>(
      `${this._url}credentials`
    );
    this.credentials = this.stateSvc.credentials$;

    this.stateSvc.pending$ = this.actionSvc.getPendingIssues();

    this.pending$ = this.stateSvc.pending$;
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

  advance(id: string) {}

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

  async pendingActionSheet(id: string) {
    this._id = id;
    console.log(id);
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
                this.loadData();

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
}
