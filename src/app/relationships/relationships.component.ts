import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { of, Observable } from 'rxjs';

import { RelationshipsStateService } from './services/relationships-state.service';
import { RelationshipsActionService } from './services/relationships-action.service';
import { map } from 'rxjs/operators';
import { StateService, IProfile } from '../core/services/state.service';
import { HttpService } from '../core/services/http.service';

@Component({
  selector: 'app-relationships',
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
        <ion-title class="ios title-ios hydrated">Relationships</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-toolbar>
      <ion-buttons slot="secondary">
        <ion-button [routerLink]="['add']">
          <ion-label>Accept</ion-label>
          <ion-icon name="people"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button [routerLink]="['invite']">
          <ion-label>Create</ion-label>
          <ion-icon name="add-circle"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
    <ion-content>
      <ion-card *ngIf="profile$ | async as profile">
        <ion-card-header>
          <ion-card-title>
            <ion-text>{{ profile.label }}</ion-text>
          </ion-card-title>
          <ion-card-subtitle *ngIf="globalStateSvc.isIssuer"
            >DID: {{ profile.did }}</ion-card-subtitle
          >
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item lines="none">
              <ion-icon name="people" slot="start"></ion-icon>
              <ion-label>Relationships</ion-label>
              <ion-note slot="end">{{ profile.relCount }}</ion-note>
            </ion-item>
            <ion-item lines="none">
              <ion-icon name="ribbon" slot="start"></ion-icon>
              <ion-label>Credentials</ion-label>
              <ion-note slot="end">{{ profile.credsCount }}</ion-note>
            </ion-item>
            <ion-item lines="none">
              <ion-icon name="wallet" slot="start"></ion-icon>
              <ion-label>Proof Certificates</ion-label>
              <ion-note slot="end">{{ profile.proofsCount }}</ion-note>
            </ion-item>
            <ion-item lines="none">
              <ion-icon name="list-box" slot="start"></ion-icon>
              <ion-label>Pending Credentials</ion-label>
              <ion-note slot="end">{{ profile.issuesCount }}</ion-note>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
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
              *ngIf="stateSvc.activeRelationship$ | async as relationshipItems"
            >
              <ion-list-header class="ion-no-margin ion-no-padding">
                <div style="display: flex; width: 100%; flex-direction: column">
                  <span class="ion-padding">My Relationships</span>
                </div>
              </ion-list-header>
              <ion-item-sliding *ngFor="let item of relationshipItems">
                <ion-item button (click)="this.viewDetail(item._id)">
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
            <ion-list>
              <ng-container
                *ngIf="
                  stateSvc.pendingInvitations$ | async as pendingInvitationItems
                "
              >
                <ion-list-header>
                  Accept / Decline Invites
                </ion-list-header>
                <ion-item-sliding *ngFor="let item of pendingInvitationItems">
                  <ion-item (click)="this.acceptInvitation(item._id)">
                    <ion-icon name="business" class="icon-lg"></ion-icon>
                    <ion-label>
                      <h2>{{ item.name }}</h2>
                      <small *ngIf="globalStateSvc.isIssuer"
                        >DID: {{ item.did }}</small
                      >
                      <ion-row>
                        <small>State: {{ item.state }}</small>
                      </ion-row>
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
              </ng-container>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./relationships.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationshipsComponent implements OnInit {
  profile$: Observable<IProfile>;

  searchQuery: '';
  constructor(
    public router: Router,
    public actionSheetCtrl: ActionSheetController,
    public stateSvc: RelationshipsStateService,
    private actionSvc: RelationshipsActionService,
    public globalStateSvc: StateService,
    private httpSvc: HttpService,
  ) {}

  async ngOnInit() {
    this.profile$ = this.httpSvc.get<IProfile>('profile');
    const pending$ = await this.actionSvc.getRelationships();
    this.stateSvc.pendingInvitations$ = pending$.pipe(
      map((obs: any[]) =>
        obs.filter(itm => itm.state !== 'active' && itm.state !== 'invitation'),
      ),
    );

    this.stateSvc.pendingInvitations$.subscribe(obs => console.log(obs));
    this.stateSvc.activeRelationship$ = this.actionSvc.getRelationshipByState(
      'active',
    );
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          },
        },
        {
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
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

    // actionSheet.present();
  }

  viewDetail(did: string) {
    this.router.navigate([`/relationships/view/${did}`]);
  }

  acceptInvitation(did: string) {
    this.router.navigate([`/relationships/approve/${did}`]);
  }

  async doRefresh(event) {
    setTimeout(() => {
      this.actionSvc
        .getRelationshipByState('active')
        .toPromise()
        .then(res => (this.stateSvc.activeRelationship$ = of(res)))
        .then(event.target.complete());
    }, 750);
  }
}
