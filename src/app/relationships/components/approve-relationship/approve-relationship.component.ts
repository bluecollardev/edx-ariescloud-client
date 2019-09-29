import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { RelationshipsStateService, IRelationship } from '../../services/relationships-state.service';
import { RelationshipsActionService } from '../../services/relationships-action.service';
import { IRelationshipResponse } from '../../models/i-relationship';

@Component({
  selector: 'app-approve-relationship',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons slot="start" class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated">
          <ion-menu-button class="hydrated ios button ion-activatable ion-focusable activated"></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">Accept Invitation</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content *ngIf="active | async as relationships">
      <ion-grid>
        <ion-row>
          <ion-col sizeXs="12" sizeMd="8" pushMd="2" sizeXl="4" pushXl="4">
            <ion-card text-center *ngFor="let relationship of relationships">
              <img src="https://insidelatinamerica.net/wp-content/uploads/2018/01/noImg_2.jpg"/>
              <ion-card-content>
                <ion-card-title>
                  {{ relationship.name }}
                </ion-card-title>
                <small><small>Their ID:  {{ relationship.did }}</small></small>
                <br />
                <small><small>My DID: acbd-123-sdf-2345</small></small>
              </ion-card-content>
              <ion-list>
                <ion-item class="flex ion-justify-content-around">
                  <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                  <ion-label>Invitiation Sent</ion-label>
                  <ion-badge color="medium" item-end>{{ relationship.received.toLocaleDateString() }}</ion-badge>
                </ion-item>

                <ion-item class="flex ion-justify-content-around" lines="none">
                  <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                  <ion-label>Status</ion-label>
                  <ion-badge color="medium" item-end>{{ relationship.status.charAt(0).toUpperCase() + relationship.status.slice(1, relationship.status.length) }}</ion-badge>
                </ion-item>
              </ion-list>
              
              <div style="display: flex">
                <ion-button
                  style="flex: 1"
                  color="danger"
                  outline
                  full
                  icon-start
                  margin
                  [routerLink]="['/relationships']"
                >
                  <ion-icon name="close"></ion-icon>
                  Decline
                </ion-button>
                <ion-button
                  style="flex: 1"
                  color="success"
                  outline
                  full
                  icon-start
                  margin
                  [routerLink]="['/relationships']"
                >
                  <ion-icon name="checkmark"></ion-icon>
                  Accept
                </ion-button>
              </div>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./approve-relationship.component.scss']
})
export class ApproveRelationshipComponent implements OnInit {
  graduationDate: string = new Date().toDateString();
  active: Observable<IRelationship[]>;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private stateSvc: RelationshipsStateService,
    private actionSvc: RelationshipsActionService
  ) {
    this.actionSvc.getPendingInvitations(); // Load all invitations first
    this.actionSvc.getPendingInvitation(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.stateSvc.ready.subscribe(bool => {
      console.log('bool', bool)
      if (bool) {
        this.active = this.stateSvc.pendingInvitations$;
      }
    });
  }

}
