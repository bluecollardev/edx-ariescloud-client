import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { MessagesStateService } from './services/messages-state.service';
import { MessagesActionService } from './services/messages-action.service';

import {
  CredentialStateService,
  ICredential
} from '../credentials/services/credential-state.service';
import { CredentialActionsService } from '../credentials/services/credential-actions.service';
import {
  RelationshipsStateService,
  IRelationship
} from '../relationships/services/relationships-state.service';
import { RelationshipsActionService } from '../relationships/services/relationships-action.service';

@Component({
  selector: 'app-relationships',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons
          slot="end"
          class="sc-ion-buttons-ioxs-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated"
        >
          <ion-menu-button
            class="hydrated ios button ion-activatable ion-focusable activated"
          ></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">My Messages</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row
          *ngIf="stateSvc.messages$ | async as relationships; else loading"
        >
          <ion-col >
            <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>
            <ion-list>
              <ion-list-header> Messages </ion-list-header>
              <ion-item-sliding
                *ngFor="let relationship of relationships"
                (click)="presentActionSheet(relationship._id)"
              >
                <ion-item>
                  <ion-icon name="person" class="icon-lg"></ion-icon>
                  <ion-label>
                    <h2>{{ relationship.label }}</h2>
                    <small>Type: {{ relationship.type }}</small>
                    <ion-row>
                      <small>State: {{ relationship.state }}</small>
                    </ion-row>

                    <ion-row
                      ><small> Updated: {{ relationship.updated }}</small>
                    </ion-row>
                  </ion-label>
                  <ion-badge color="primary" item-end>2</ion-badge>
                </ion-item>
              </ion-item-sliding>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ng-template #loading
      ><ion-spinner style="margin: auto auto;"></ion-spinner
      ><ion-label>Loading</ion-label></ng-template
    >
  `,
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent implements OnInit {
  searchQuery: '';
  credentials: Observable<ICredential[]>;
  relationships: Observable<IRelationship[]>;
  _id: string;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public stateSvc: MessagesStateService,
    private actionSvc: MessagesActionService,
    public relationshipsStateSvc: RelationshipsStateService,
    public relationshipsActionSvc: RelationshipsActionService,
    // Not used yet...
    public credentialStateSvc: CredentialStateService,
    public credentialActionSvc: CredentialActionsService
  ) {}

  ngOnInit() {
    const messages$ = this.actionSvc.getMessages();
    this.stateSvc.messages$ = messages$;
  }

  getItems(ev: any) {
    // Reset items back to all of the items

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      /*this.items = this.items.filter(item => {
        return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });*/
    }
  }

  async presentActionSheet(id: string) {
    // if (!this.actionMap[state]) return;
    this._id = id;

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Accept',
          handler: async () => {
            return true;
          }
        },
        {
          text: 'Decline',
          handler: async () => {
            return true;
          }
        }
      ]
    });

    actionSheet.present();
  }
}
