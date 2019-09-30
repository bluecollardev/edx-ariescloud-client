import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { MessagesStateService } from './services/messages-state.service';
import { MessagesActionService } from './services/messages-action.service';

import { CredentialStateService, ICredential } from '../credentials/services/credential-state.service';
import { CredentialActionsService } from '../credentials/services/credential-actions.service';
import { RelationshipsStateService, IRelationship } from '../relationships/services/relationships-state.service';
import { RelationshipsActionService } from '../relationships/services/relationships-action.service';


@Component({
  selector: 'app-relationships',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons
          slot="start"
          class="sc-ion-buttons-ioxs-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated"
        >
          <ion-menu-button
            class="hydrated ios button ion-activatable ion-focusable activated"
          ></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated"
          >My Messages</ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row *ngIf="relationships | async as relationships">
          <ion-col sizeXs="12" sizeMd="12" pushMd="12" sizeXl="8" pushXl="2">
            <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>
            <ion-list>
              <ion-list-header>
                By Relationship
              </ion-list-header>
              <ion-item-sliding *ngFor="let relationship of relationships" [routerLink]="['view']">
                <ion-item>
                  <ion-icon name="person" class="icon-lg"></ion-icon>
                  <ion-label>
                    <h2>{{ relationship.name }}</h2>
                    <small>DID: abcd-1234-df34-cd34</small>
                  </ion-label>
                  <ion-badge color="primary" item-end>2</ion-badge>
                </ion-item>
              </ion-item-sliding>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent implements OnInit {
  searchQuery: '';
  credentials: Observable<ICredential[]>;
  relationships: Observable<IRelationship[]>;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    private stateSvc: MessagesStateService,
    private actionSvc: MessagesActionService,
    public relationshipsStateSvc: RelationshipsStateService,
    public relationshipsActionSvc: RelationshipsActionService,
    // Not used yet...
    public credentialStateSvc: CredentialStateService,
    public credentialActionSvc: CredentialActionsService
  ) {
    this.initializeItems();
  }

  ngOnInit() {
    this.relationshipsStateSvc.ready.subscribe(bool => {
      console.log('bool', bool);
      if (bool) {
        this.relationships = this.relationshipsStateSvc.relationships$;
        this.relationships.subscribe(obs => console.log(obs));
      }
    });
  }

  async initializeItems() {
    await this.relationshipsActionSvc.getRelationships();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      /*this.items = this.items.filter(item => {
        return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });*/
    }
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },
        {
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
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

    // actionSheet.present();
  }
}
