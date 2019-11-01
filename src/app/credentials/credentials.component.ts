import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';

import {
  CredentialStateService,
  ICredentialDef
} from './services/credential-state.service';
import { CredentialActionsService, ICredentialParams } from './services/credential-actions.service';

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
        <ion-title class="ios title-ios hydrated"
          >Manage Credentials</ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col sizeXs="12" sizeMd="12" pushMd="12" sizeXl="8" pushXl="2">
            <ion-list
              *ngIf="stateSvc.credentialDefs$ | async as credDefs"
            >
              <ion-list-header class="ion-no-margin ion-no-padding">
                <div style="display: flex; width: 100%; flex-direction: column">
                  <span class="ion-padding">Issued Credentials By Type</span>
                  <!--<ion-searchbar></ion-searchbar>-->
                </div>
              </ion-list-header>
              <ion-item-sliding *ngFor="let credDef of credDefs">
                <ion-item (click)="presentActionSheet(credDef._id)">
                  <ion-icon name="document" class="icon-lg"></ion-icon>
                  <ion-label>
                    <h2>{{ credDef.name }}</h2>
                    <small>{{ credDef.program }}</small>
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
            
            <div style="display: flex">
              <ion-button
                style="flex: 1"
                color="primary"
                clear
                full
                icon-start
                margin
                [routerLink]="['issue']"
              >
                <ion-icon name="add"></ion-icon>
                Issue Credential
              </ion-button>
            </div>
            
            <ion-list
              *ngIf="stateSvc.credentialDefs$ | async as credDefs"
            >
              <ion-list-header class="ion-no-margin ion-no-padding">
                <div style="display: flex; width: 100%; flex-direction: column">
                  <span class="ion-padding">Credential Types</span>
                  <!--<ion-searchbar></ion-searchbar>-->
                </div>
              </ion-list-header>
              <ion-item-sliding *ngFor="let credDef of credDefs">
                <ion-item (click)="presentActionSheet(credDef._id)">
                  <ion-icon name="document" class="icon-lg"></ion-icon>
                  <ion-label>
                    <h2>{{ credDef.name }}</h2>
                    <small>{{ credDef.program }}</small>
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
            
            <div style="display: flex">
              <ion-button
                style="flex: 1"
                color="primary"
                clear
                full
                icon-start
                margin
                [routerLink]="['create']"
              >
                <ion-icon name="add"></ion-icon>
                Create Credential Type
              </ion-button>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {
  searchQuery: '';
  credentialDefs: Observable<ICredentialDef[]>;
  credentials: Observable<ICredentialParams[]>;
  _id: string;

  constructor(
    private router: Router,
    public stateSvc: CredentialStateService,
    private actionSvc: CredentialActionsService,
    public actionSheetCtrl: ActionSheetController
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
          text: 'View',
          handler: () => {
            this.router.navigate([`/credentials/view/${this._id}`]);
          }
        },
        {
          text: 'Edit',
          handler: () => {
            this.router.navigate([`/credentials/edit/${this._id}`]);
          }
        },
        {
          text: 'Hide',
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
}
