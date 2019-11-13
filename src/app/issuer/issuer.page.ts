import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CredentialStateService,
  ICredentialDef,
} from '../credentials/services/credential-state.service';
import { CredentialActionsService } from '../credentials/services/credential-actions.service';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { map, tap } from 'rxjs/operators';
import { ICredentialResponse } from '../credentials/components/credentials-received/credentials-received.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-issuer',
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
        <ion-title class="ios title-ios hydrated">Issuers</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-toolbar>
      <ion-buttons slot="secondary">
        <ion-button [routerLink]="['/issuer/manage']">
          <ion-label>Creds</ion-label>
          <ion-icon name="ribbon"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button [routerLink]="['/credentials/create']">
          <ion-label>New</ion-label>
          <ion-icon name="add-circle"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ng-container
              *ngIf="credentialDefs | async as credDefs; else noDefs"
            >
              <ion-list *ngIf="credDefs.length > 0; else noDefs">
                <ion-list-header class="ion-no-margin ion-no-padding">
                  <div
                    style="display: flex; width: 100%; flex-direction: column"
                  >
                    <span class="ion-padding">Credential Types</span>
                  </div>
                </ion-list-header>
                <ion-item-sliding *ngFor="let credDef of credDefs">
                  <ion-item (click)="presentActionSheet(credDef._id)">
                    <ion-label>
                      <h2>{{ credDef.name }}</h2>
                      <p>{{ credDef.program }}</p>
                      <p>Version: {{ credDef.version }}</p>

                      <ion-note *ngFor="let attr of credDef.attributes">{{
                        attr
                      }}</ion-note>
                    </ion-label>
                    <app-chip
                      label="issue"
                      color="primary"
                      iconColor="blue"
                      icon="add-circle"
                    >
                    </app-chip>
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
            </ng-container>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ng-template #noDefs>
      <ion-card text-center>
        <ion-card-header>
          <ion-card-title>
            <h2>
              You have no credential definitions.
            </h2>
          </ion-card-title>
          <ion-card-subtitle>
            Create a new credential type to start issuing!
          </ion-card-subtitle>
        </ion-card-header>
      </ion-card>
    </ng-template>
  `,
  styleUrls: ['./issuer.page.css'],
})
export class IssuerPage implements OnInit {
  searchQuery: '';
  credentialDefs: Observable<ICredentialDef[]>;
  credentials: Observable<ICredentialResponse[]>;
  _id: string;
  timeout = false;

  constructor(
    private router: Router,
    public stateSvc: CredentialStateService,
    private actionSvc: CredentialActionsService,
    public actionSheetCtrl: ActionSheetController,
    public loadingController: LoadingController,
  ) {
    setTimeout(() => {
      this.timeout = true;
      console.log('run');
    }, 1500);
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
  }
  async presentActionSheet(credDefId: any) {
    this._id = credDefId;
    console.log(credDefId);
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
