import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';

import {
  ActionSheetController,
  AlertController,
  LoadingController,
} from '@ionic/angular';

import { Observable } from 'rxjs';

import { HttpService } from '../../../core/services/http.service';

import {
  CredentialStateService,
  ICredential,
  IIssuer,
} from '../../services/credential-state.service';

import {
  RelationshipsStateService,
  IRelationship,
} from '../../../relationships/services/relationships-state.service';

import { CredentialActionsService } from '../../services/credential-actions.service';

import { map, tap, reduce } from 'rxjs/operators';
import { LoadingService } from 'src/app/core/services/loading.service';

const url = environment.apiUrl;

// TODO: Is there something that already exists for these states
const credentialStates = {
  request_sent: 'Request Sent',
  request_received: 'Request Received',
  offer_sent: 'Offer Sent',
  offer_received: 'Offer Received',
  credential_received: 'Credential Received',
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
        <ion-title class="ios title-ios hydrated">My Credentials</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-toolbar>
      <ion-buttons slot="secondary">
        <ion-button [routerLink]="['/credentials/create']">
          <ion-label>Create</ion-label>
          <ion-icon name="circle-add"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button [routerLink]="['/credentials/relationship']">
          <ion-label>Issue</ion-label>
          <ion-icon name="add-circle"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
    <ion-content>
      <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
        <ion-refresher-content> </ion-refresher-content>
      </ion-refresher>
      <ion-grid md>
        <ion-row>
          <ion-col>
            <ion-list *ngIf="credentials | async as creds">
              <ng-container *ngIf="creds.length > 0">
                <ion-list-header class="ion-no-margin ion-no-padding">
                  <div
                    style="display: flex; width: 100%; flex-direction: column"
                  >
                    <span class="ion-padding">Stored Credentials</span>
                  </div>
                </ion-list-header>
                <ion-item-sliding *ngFor="let cred of creds">
                  <ion-item (click)="navigate(cred._id)">
                    <ion-icon
                      name="ribbon"
                      slot="start"
                      size="large"
                    ></ion-icon>
                    <ion-label
                      ><h2>{{ cred.name }}</h2>
                      <ion-note *ngFor="let attr of cred.attrs"
                        >{{ attr.label }}
                      </ion-note>
                    </ion-label>
                  </ion-item>
                </ion-item-sliding>
              </ng-container>
            </ion-list>
            <ion-list *ngIf="pending$ | async as pendingCreds">
              <ng-container *ngIf="pendingCreds.length > 0; else noPending">
                <ion-list-header>
                  Accept New Credentials
                </ion-list-header>
                <ion-item-sliding *ngFor="let cred of pendingCreds">
                  <ion-item
                    (click)="
                      router.navigate([
                        '/credentials/pending/' + cred.credential_exchange_id
                      ])
                    "
                  >
                    <ion-icon name="cog" size="medium" slot="start"></ion-icon>
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
              </ng-container>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ng-template #noPending>
      <ion-card text-center>
        <ion-card-header>
          <ion-card-title>
            <h2>
              There's no Pending Credentials
            </h2>
          </ion-card-title>
        </ion-card-header>
      </ion-card>
    </ng-template>
  `,
  styleUrls: ['./credentials-received.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    issued: false,
  };

  constructor(
    public router: Router,
    public stateSvc: CredentialStateService,
    public relationshipStateSvc: RelationshipsStateService,
    private actionSvc: CredentialActionsService,
    public actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private loadingSvc: LoadingService,
    private httpSvc: HttpService,
    public loadingController: LoadingController,
  ) {
    this._url = url;
    this.credentialStates = credentialStates;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.pending$ = this.actionSvc.getPendingIssues().pipe(
      map(itms => {
        const arr = [];

        itms.forEach(val => {
          val.records.forEach(cred => arr.push(cred));
        });
        return arr;
      }),
      tap(obs => console.log(obs)),
    );
    this.credentials = this.actionSvc.getCredentials();
  }

  async pendingActionSheet(id: string, state: string) {
    this._id = id;
    console.log(this._id);
    const opts = {
      buttons: [
        {
          text: 'View',
          handler: () => {
            this.router.navigate(['/credentials/pending/' + this._id]);
          },
          role: '',
        },
      ],
    };
    const decline = {
      text: 'Decline',
      handler: async () => {
        const rm = await this.httpSvc.delete('issues', this._id);
        return true;
      },
      role: 'destructive',
    };

    const accept = {
      text: 'Accept ' + state,
      handler: async () => {
        const loading = await this.loadingSvc.presentLoading();
        await loading.present();
        try {
          const post = await this.httpSvc
            .postById<{ _id: string }>('issues', this._id)
            .toPromise();
          if (post) {
            setTimeout(() => {
              loading.dismiss();
              this.router.navigate(['/credentials/pending/' + this._id]);
            }, 3000);

            return true;
          }
        } catch {
          loading.dismiss();
          return false;
        }
      },
      role: 'destructive',
    };
    this.actionMap[state]
      ? opts.buttons.push(accept)
      : opts.buttons.push(decline);

    const actionSheet = await this.actionSheetCtrl.create(opts);

    await actionSheet.present();
  }

  navigate(id: string) {
    this.router.navigate(['/credentials/received/view/' + id]);
  }
  doRefresh(event) {
    setTimeout(() => {
      this.loadData();
      event.target.complete();
    }, 750);
  }
}
