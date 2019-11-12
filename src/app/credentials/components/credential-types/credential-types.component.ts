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
import { ICredentialResponse } from '../credentials-received/credentials-received.component';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-credential-types',
  template: `
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-list *ngIf="stateSvc.credentialDefs$ | async as credDefs">
            <ion-list-header class="ion-no-margin ion-no-padding">
              <div style="display: flex; width: 100%; flex-direction: column">
                <span class="ion-padding">Credential Types</span>
              </div>
            </ion-list-header>
            <ion-item-sliding *ngFor="let credDef of credDefs">
              <ion-item (click)="presentActionSheet(credDef._id)">
                <ion-icon name="list-box" class="icon-lg"></ion-icon>
                <ion-label>
                  <h2>{{ credDef.name }}</h2>
                  <small>{{ credDef.program }}</small>
                  <small>Version: {{ credDef.version }}</small>
                </ion-label>
                <ion-badge color="success" item-end
                  ><ion-icon name="checkmark" class="icon-md">{{
                    credDef.count
                  }}</ion-icon></ion-badge
                >
              </ion-item>
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

          <div style="display: flex">
            <ion-button
              style="flex: 1"
              color="primary"
              clear
              full
              icon-start
              margin
              [routerLink]="['/credentials/create']"
            >
              <ion-icon name="add"></ion-icon>
              New Credential Type
            </ion-button>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  `,
  styleUrls: ['./credential-types.component.css'],
})
export class CredentialTypesComponent implements OnInit {
  searchQuery: '';
  credentialDefs: Observable<ICredentialDef[]>;
  credentials: Observable<ICredentialResponse[]>;
  _id: string;

  constructor(
    private router: Router,
    public stateSvc: CredentialStateService,
    private actionSvc: CredentialActionsService,
    public actionSheetCtrl: ActionSheetController,
    public loadingController: LoadingController,
  ) {
    // this.initializeItems();
  }

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
              credDef._id.slice(credDef._id.indexOf('cdef_' + 1)),
          ).length,
          ...credDef,
        })),
      ),
    );
    this.credentialDefs.subscribe(obs => console.log(obs));
    // this.stateSvc.credentials$ = this.actionSvc.getCredentials();

    // this.stateSvc.credentialDefs$.subscribe(obs => console.log(obs));
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      /*this.credentialDefs = this.credentialDefs.filter(item => {
        return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });*/
    }
  }

  async presentActionSheet(credDefId: any) {
    this._id = credDefId;
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Issue Credential To...',
          handler: () => {
            this.router.navigate([`/credentials/issue/${this._id}`]);
          },
        },
        {
          text: 'Preview Credential Type',
          handler: () => {
            this.router.navigate([`/credentials/type/${this._id}/preview`]);
          },
        },
        {
          text: 'Edit Credential Type',
          handler: () => {
            this.router.navigate([`/credentials/edit/${this._id}`]);
          },
        },
        {
          text: 'Hide Credential Type',
          role: 'destructive',
          handler: async () => {
            await this.actionSvc.deleteCredDef(this._id);
            this.actionSvc.setRelState();
            this.credentialDefs = this.stateSvc.credentialDefs$;
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
}
