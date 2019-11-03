import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { ActionSheetController, LoadingController } from '@ionic/angular';
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
        <ion-title class="ios title-ios hydrated">{{ this.getTitle() }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="ion-padding" *ngIf="this.activeTab !== 'recipients'">
        <ion-segment color="primary">
          <ion-segment-button value="received" [checked]="this.activeTab === 'received'" (ionSelect)="this.segmentButtonClicked($event, 'received')">
            <ion-label>Received</ion-label>
          </ion-segment-button>
          <ion-segment-button value="issued" [checked]="this.activeTab === 'issued'" (ionSelect)="this.segmentButtonClicked($event, 'issued')">
            <ion-label>Issued</ion-label>
          </ion-segment-button>
          <ion-segment-button value="types" [checked]="this.activeTab === 'types'" (ionSelect)="this.segmentButtonClicked($event, 'types')">
            <ion-label>Types</ion-label>
          </ion-segment-button>
        </ion-segment>
      </div>
      
      <!-- This is a hidden "tab" -->
      <app-credential-relationships *ngIf="this.activeTab === 'recipients'">
      </app-credential-relationships>
      
      <app-credentials-received *ngIf="this.activeTab === 'received'">
      </app-credentials-received>
      <app-credentials-issued *ngIf="this.activeTab === 'issued'">
      </app-credentials-issued>
      <app-credential-types *ngIf="this.activeTab === 'types'">
      </app-credential-types>
    </ion-content>
  `,
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {
  activeTab: string;
  searchQuery: '';
  credentialDefs: Observable<ICredentialDef[]>;
  credentials: Observable<ICredentialParams[]>;
  _id: string;

  validTabs = ['issued', 'recipients', 'types', 'received'];

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public stateSvc: CredentialStateService,
    private actionSvc: CredentialActionsService,
    public actionSheetCtrl: ActionSheetController,
    public loadingController: LoadingController
  ) {
    // this.initializeItems();
  }

  ngOnInit() {
    this.route.url.subscribe(segments => {
      console.log(segments);
      if (segments instanceof Array && segments.length > 1) {
        // Is the route filtered by ID?
        if (this.validTabs.indexOf(segments[1].path) > -1) {
          this.activeTab = segments[1].path;
        } else {
          // TODO: Fix this assume it's an ID for now
          if (segments.length > 2) {
            if (this.validTabs.indexOf(segments[2].path) > -1) {
              this.activeTab = segments[2].path;
            }
          }
        }
      } else {
        this.activeTab = 'issued';
      }
    });

    this.stateSvc.credentialDefs$ = this.actionSvc.getCredentialDefs();
    this.stateSvc.credentials$ = this.actionSvc.getCredentials();

    this.credentialDefs = this.stateSvc.credentialDefs$;
    this.credentials = this.stateSvc.credentials$;

  }

  getTitle() {
    let title = 'Credentials';
    switch (this.activeTab) {
      case 'types':
        title = 'Your Credential Types';
        break;
      case 'recipients':
        title = 'Manage Recipients';
        break;
      case 'issued':
        title = 'Issued Credentials';
        break;
      case 'received':
        title = 'Your Credentials';
    }

    return title;
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
          text: 'Issue',
          handler: () => {
            this.router.navigate([`/credentials/issue/${this._id}`]);
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
          handler: async () => {
            await this.actionSvc.deleteCredDef(this._id);
            this.actionSvc.setRelState();
            this.credentialDefs = this.stateSvc.credentialDefs$;
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

  segmentButtonClicked(ev: any, tab: string) {
    console.log('segment selected');
    console.log(tab);
    console.log(ev);

    this.activeTab = tab;
  }
}
