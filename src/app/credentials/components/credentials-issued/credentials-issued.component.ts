import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

import {
  CredentialStateService,
  ICredentialDef
} from '../../services/credential-state.service';
import { CredentialActionsService, ICredentialParams } from '../../services/credential-actions.service';

@Component({
  selector: 'app-credentials-issued',
  template: `
    <ng-container>
      <ion-grid>
        <ion-row>
          <ion-col sizeXs="12" sizeMd="12" pushMd="12" sizeXl="8" pushXl="2">
            <ion-list
              *ngIf="stateSvc.credentialDefs$ | async as credDefs"
            >
              <ion-list-header class="ion-no-margin ion-no-padding">
                <div style="display: flex; width: 100%; flex-direction: column">
                  <span class="ion-padding">Issued Credentials By Type</span>
                  <ion-searchbar></ion-searchbar>
                </div>
              </ion-list-header>
              <ion-item-sliding *ngFor="let credDef of credDefs">
                <ion-item (click)="presentActionSheet(credDef._id)">
                  <ion-icon name="document" class="icon-lg"></ion-icon>
                  <ion-label>
                    <h2>{{ credDef.name }}</h2>
                    <small>{{ credDef.program }}</small>
                    <small>VERSION: {{ credDef.version }}</small>
                  </ion-label>
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
  
            <!--<div style="display: flex">
              <ion-button
                style="flex: 1"
                color="primary"
                clear
                full
                icon-start
                margin
                (click)="this.router.navigate(['/credentials/issue/' + credDef._id])"
              >
                <ion-icon name="add"></ion-icon>
                Issue Credential
              </ion-button>
            </div>-->
          </ion-col>
        </ion-row>
      </ion-grid>
    </ng-container>
  `,
  styleUrls: ['./credentials-issued.component.css']
})
export class CredentialsIssuedComponent implements OnInit {

  searchQuery: '';
  credentialDefs: Observable<ICredentialDef[]>;
  credentials: Observable<ICredentialParams[]>;
  _id: string;

  constructor(
    private router: Router,
    public stateSvc: CredentialStateService,
    private actionSvc: CredentialActionsService,
    public actionSheetCtrl: ActionSheetController,
    public loadingController: LoadingController
  ) {
    // this.initializeItems();
  }

  ngOnInit() {
    this.stateSvc.credentialDefs$ = this.actionSvc.getCredentialDefs();
    this.stateSvc.credentials$ = this.actionSvc.getCredentials();

    this.credentialDefs = this.stateSvc.credentialDefs$;
    this.credentials = this.stateSvc.credentials$;

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
          text: 'Manage Recipients',
          handler: () => {
            this.router.navigate([`/credentials/${this._id}/recipients`]);
          }
        },
        {
          text: 'Issue This Credential',
          handler: () => {
            this.router.navigate([`/credentials/issue/${this._id}`]);
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

}