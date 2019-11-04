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
        <ion-title class="ios title-ios hydrated"
          >Preview Credential Type</ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col sizeXs="12" sizeMd="8" pushMd="2" sizeXl="4" pushXl="4">
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
                        ><small>Issued by:</small> {{ active.issuedBy }}</small
                      ></small
                    >
                    <!--<br />
                    <small><small><small>Issued to:</small> Alice Cooper</small></small>-->
                  </div>
                </ion-card-title>
                <small><small>Tax ID: 123-45-6789</small></small>
                <br />
                <small
                  ><small>DID: {{ active.did }}</small></small
                >
              </ion-card-content>
              <ion-card-content>
                <p>
                  Alice is a verified graduate of the
                  {{ active.program }} program at {{ active.issuedBy }}.
                </p>
              </ion-card-content>

              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                <ion-label>Date Issued</ion-label>
                <ion-badge color="medium" item-end></ion-badge>
              </ion-item>

              <ion-item
                class="flex ion-justify-content-around"
                *ngFor="let attr of active.attributes"
              >
                <!--<ion-icon name='musical-notes' item-start style="color: #d03e84"></ion-icon>-->
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
    this.active$ = this.actionSvc.getCredential(
      this.route.snapshot.paramMap.get('id')
    );
  }

  ngOnInit() {}
}
