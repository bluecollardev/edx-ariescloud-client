import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { first, last, map, reduce, find, filter, skipWhile } from 'rxjs/operators';

import { RelationshipsStateService, IRelationship } from './services/relationships-state.service';
import { RelationshipsActionService } from './services/relationships-action.service';
import { IRelationshipResponse } from './models/i-relationship';

@Component({
  selector: 'app-relationships',
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
          >Manage Relationships</ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col sizeXs="12" sizeMd="12" pushMd="12" sizeXl="8" pushXl="2">
            <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>
            <ion-list *ngIf="pendingInvitations | async as pendingInvitationItems">
              <ion-list-header>
                Pending Invitations
              </ion-list-header>
              <ion-item-sliding *ngFor="let item of pendingInvitationItems">
                <ion-item (click)="this.acceptInvitation(item.did)">
                  <ion-icon name="business" class="icon-lg"></ion-icon>
                  <ion-label>
                    <h2>{{ item.name }}</h2>
                    <small>DID: {{ item.did }}</small>
                  </ion-label>
                </ion-item>
                <ion-item-options>
                  <ion-item-option color="danger" type="button" icon-start>
                    <ion-icon name="ios-close" class="icon-md"></ion-icon>
                    Decline
                  </ion-item-option>
                  <ion-item-option color="success" type="button" icon-start>
                    <ion-icon name="ios-checkmark" class="icon-md"></ion-icon>
                    Accept
                  </ion-item-option>
                </ion-item-options>
              </ion-item-sliding>
            </ion-list>
            <ion-list *ngIf="relationships | async as relationshipItems">
              <ion-list-header>
                My Relationships
              </ion-list-header>
              <ion-item-sliding *ngFor="let item of relationshipItems">
                <ion-item (click)="this.viewDetail(item.did)">
                  <ion-icon name="person" class="icon-lg"></ion-icon>
                  <ion-label>
                    <h2>{{ item.name }}</h2>
                    <small>DID: {{ item.did }}</small>
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
                [routerLink]="['add']"
              >
                <ion-icon name="person-add"></ion-icon>
                Create Invitation
              </ion-button>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./relationships.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationshipsComponent implements OnInit {
  // searchQuery: '';
  pendingInvitations: Observable<IRelationship[]>;
  relationships: Observable<IRelationship[]>;

  constructor(
    public router: Router,
    public actionSheetCtrl: ActionSheetController,
    private stateSvc: RelationshipsStateService,
    private actionSvc: RelationshipsActionService
  ) {
    this.initializeItems();
  }

  ngOnInit() {
    this.stateSvc.ready.subscribe(bool => {
      console.log('bool', bool)
      if (bool) {
        this.pendingInvitations = this.stateSvc.pendingInvitations$;
        this.pendingInvitations.subscribe(obs => {
          console.log('pending invitations loaded');
          console.log(obs);
        });

        this.relationships = this.stateSvc.relationships$;
        this.relationships.subscribe(obs => {
          console.log('relationships loaded');
          console.log(obs);
        });
      }
    });
  }

  async initializeItems() {
    await this.actionSvc.getPendingInvitations();
    await this.actionSvc.getRelationships();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.relationships = this.relationships.pipe(
        map(rs => rs.filter(r => {
          return r.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
        }))
      );
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

  viewDetail(did: string) {
    this.router.navigate([`/relationships/view/${did}`]);
  }

  acceptInvitation(did: string) {
    this.router.navigate([`/relationships/approve/${did}`]);
  }
}
