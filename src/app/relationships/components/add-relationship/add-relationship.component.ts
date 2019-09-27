import { Component, OnInit } from '@angular/core';
import { RelationshipsStateService } from '../../services/relationships-state.service';
import { RelationshipsActionService } from '../../services/relationships-action.service';
import { Observable } from 'rxjs';
import { IInvitation } from '../../models/i-invitation';

@Component({
  selector: 'app-add-relationship',
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
        <ion-title class="ios title-ios hydrated">New Invitation</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <br />
      <br />
      <!--<ion-grid *ngIf="invitation$ | async as invite">-->
      <ion-grid>
        <ion-row>
          <ion-col sizeXs="12" sizeMd="8" pushMd="2" sizeXl="4" pushXl="4">
            <form>
              <ion-list lines="full" class="ion-no-margin ion-no-padding">
                <ion-item>
                  <ion-label position="stacked"
                    >Send To (Provide DID)
                    <ion-text color="danger">*</ion-text>
                  </ion-label>
                  <ion-input required type="text"></ion-input>
                </ion-item>

                <ion-item>
                  <ion-label position="stacked">Notes</ion-label>
                  <ion-textarea></ion-textarea>
                </ion-item>
              </ion-list>

              <div style="display: flex">
                <ion-button
                  style="flex: 1"
                  color="primary"
                  clear
                  full
                  icon-start
                  margin
                  [routerLink]="['/relationships']"
                >
                  <ion-icon name="send"></ion-icon>
                  Send Invitation
                </ion-button>
              </div>
            </form>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./add-relationship.component.scss']
})
export class AddRelationshipComponent implements OnInit {
  invitation$: Observable<IInvitation>;
  constructor(
    private stateSvc: RelationshipsStateService,
    private actionSvc: RelationshipsActionService
  ) {}

  ngOnInit() {
    this.actionSvc.createInvitation();
    this.stateSvc.ready.subscribe(bool => {
      // if (bool) this.invitation$ = this.stateSvc.invitation$;
    });
  }
}
