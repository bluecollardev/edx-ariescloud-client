import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CredentialStateService,
  ICredentialDef
} from '../../services/credential-state.service';
import { CredentialActionsService } from '../../services/credential-actions.service';

// import { ICredentialResponse } from '../../models/i-credential';

@Component({
  selector: 'app-view-credential',
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
        <ion-buttons
          slot="start"
          class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated"
        >
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated"
          >Preview Credential Type</ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col >
            <ion-card text-center *ngIf="active$ | async as active">
              <img
                src="https://insidelatinamerica.net/wp-content/uploads/2018/01/noImg_2.jpg"
              />

              <ion-card-content>
                <ion-card-title>
                  {{ active.name }}
                  <br />
                  <div style="text-align: left; max-width: 60%; margin: 0 auto">
                    <small
                      ><small
                        ><small>Issued by:</small> Ipsum Lorem</small
                      ></small
                    >
                    <!--<br />
                    <small><small><small>Issued to:</small> Alice Cooper</small></small>-->
                  </div>
                </ion-card-title>
                <small><small>Tax ID: 123-45-6789</small></small>
                <br />
                <small
                  ><small>DID: abcd-1234-efgh-5678-ijkl</small></small
                >
              </ion-card-content>

              <ion-item
                class="flex ion-justify-content-around"
                *ngFor="let attr of active.attributes"
              >
                <ion-label>{{ attr }}</ion-label>
              </ion-item>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./view-credential-type.component.scss']
})
export class ViewCredentialTypeComponent implements OnInit {
  active$: Observable<ICredentialDef>;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private stateSvc: CredentialStateService,
    private actionSvc: CredentialActionsService
  ) {
    this.active$ = this.actionSvc.getCredentialDef(
      this.route.snapshot.paramMap.get('id')
    );
  }

  ngOnInit() {}
}
