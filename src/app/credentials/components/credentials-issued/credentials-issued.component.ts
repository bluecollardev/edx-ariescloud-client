import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

import {
  CredentialStateService,
  ICredentialDef,
} from '../../services/credential-state.service';
import {
  CredentialActionsService,
  ICredentialParams,
} from '../../services/credential-actions.service';
import { tap, map } from 'rxjs/operators';
import { ICredentialResponse } from '../credentials-received/credentials-received.component';

@Component({
  selector: 'app-credentials-issued',
  template: `
    <ng-container>
      <ion-content>
        <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
          <ion-refresher-content
            pullingIcon="arrow-dropdown"
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Getting relationships..."
          >
          </ion-refresher-content>
        </ion-refresher>
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-list
                *ngIf="credentialDefs | async as credDefs; else noCreds"
              >
                <ion-list-header class="ion-no-margin ion-no-padding">
                  <div
                    style="display: flex; width: 100%; flex-direction: column"
                  >
                    <span class="ion-padding">Issued Credentials By Type</span>
                  </div>
                </ion-list-header>
                <ion-item-sliding *ngFor="let credDef of credDefs; index as i">
                  <ion-item (click)="presentActionSheet(credDef._id)">
                    <ion-icon name="list-box" class="icon-lg"></ion-icon>
                    <ion-label>
                      <h2>{{ credDef.name }}</h2>
                      <small>{{ credDef.program }}</small>
                      <small>Version: {{ credDef.version }}</small>
                    </ion-label>
                    <ion-badge color="medium" item-end>{{
                      credDef.count
                    }}</ion-badge>
                  </ion-item>
                  <!--
                  <ion-list
                    *ngIf="
                      credDef.records.length > 0 && this._id === credDef._id
                    "
                  >
                    <ion-item *ngFor="let cred of credDef.records">
                      <ion-icon name="ribbon" class="icon-lg"></ion-icon>
                      <ion-list>
                        <ion-item>
                          <ion-label>
                            <h2>{{ cred.name }}</h2>
                          </ion-label>

                          <small>{{ cred.state }}</small>
                          <small>Version: {{ cred.version }}</small>
                        </ion-item>
                      </ion-list>
                      <ion-icon
                        color="medium"
                        item-end
                        [name]="
                          cred.state === 'issued'
                            ? 'checkmark-circle'
                            : 'remove-circle'
                        "
                        slot="end"
                      ></ion-icon>
                    </ion-item>
                  </ion-list>
                      -->

                  <ion-item-options>
                    <ion-item-option color="danger" type="button" icon-start>
                      <ion-icon name="trash" class="icon-md"></ion-icon>
                      Delete
                    </ion-item-option>
                    <ion-item-option color="light" type="button" icon-start>
                      <ion-icon name="ios-eye-off" class="icon-md"></ion-icon>
                      Disable
                    </ion-item-option>
                  </ion-item-options>
                </ion-item-sliding>
              </ion-list>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    </ng-container>
    <ng-template #noCreds></ng-template>
  `,
  styleUrls: ['./credentials-issued.component.css'],
})
export class CredentialsIssuedComponent implements OnInit {
  viewRecord: string;
  searchQuery: '';
  credentialDefs: Observable<any[]>;
  credentials: Observable<ICredentialResponse[]>;
  _id: string;

  constructor(
    private router: Router,
    private actionSvc: CredentialActionsService,
    public actionSheetCtrl: ActionSheetController,
    public loadingController: LoadingController,
  ) {}

  async ngOnInit() {
    const credentials = await this.actionSvc
      .getPendingIssues()
      .pipe(
        map(itms =>
          itms.map(itm =>
            itm.records
              .map(record => ({
                _id: itm.credential_exchange_id,
                ...itm,
                ...record,
              }))
              .reduce(itm => itm),
          ),
        ),
        tap(obs => console.log(obs)),
      )
      .toPromise();
    // credentials.subscribe(obs => console.log(obs));
    this.credentialDefs = this.actionSvc.getCredentialDefs().pipe(
      map(obs =>
        obs.map(credDef => ({
          count: credentials.filter(
            cred =>
              cred.credential_definition_id ===
              credDef._id.slice(credDef._id.indexOf('_' + 1)),
          ).length,
          ...credDef,
        })),
      ),
      tap(obs => console.log(obs)),
    );
  }

  async presentActionSheet(credDefId: any) {
    this._id = credDefId;
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Manage Recipients',
          handler: () => {
            this.router.navigate([`/credentials/${this._id}/recipients`]);
          },
        },
        {
          text: 'Issue Credential To...',
          handler: () => {
            this.router.navigate([`/credentials/issue/${this._id}`]);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });

    await actionSheet.present();
  }

  async doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 750);
  }
}
