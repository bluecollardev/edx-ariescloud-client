import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CredentialStateService,
  ICredentialDef
} from '../../services/credential-state.service';
import { CredentialActionsService } from '../../services/credential-actions.service';
import { RelationshipActionsService } from '../../services/relationship-actions.service';
import { IRelationship } from '../../../relationships/services/relationships-state.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

// import { ICredentialResponse } from '../../models/i-credential';

@Component({
  selector: 'app-issue-credential-relationships',
  template: `
    <form [formGroup]="fg">
      <ion-grid>
        <!-- TODO: Conditionally display this -->
        <!--<ion-row>
          <ion-col>
            <ion-item>
              <ion-label position="stacked"
                >Select / Change Type
                <ion-text color="danger">*</ion-text>
              </ion-label>
              <ion-select required>
                <ion-select-option selected>BSc Degree</ion-select-option>
                <ion-select-option>BA Degree</ion-select-option>
                <ion-select-option>MBA Degree</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-col>
          <ion-col size="4">
            <ion-button margin-end [routerLink]="['/credentials/create']">
              <ion-icon name="add"></ion-icon>
              New
            </ion-button>
          </ion-col>
        </ion-row>-->
        <ion-row *ngIf="relationships | async as relationships">
          <ion-col sizeXs="12" sizeMd="12" pushMd="12" sizeXl="8" pushXl="2">
            <ion-list>
              <ion-list-header class="ion-no-margin ion-no-padding">
                <div style="display: flex; width: 100%; flex-direction: column">
                  <span class="ion-padding">Issue To</span>
                  <ion-searchbar></ion-searchbar>
                </div>
              </ion-list-header>
              <ion-item-sliding
                *ngFor="let relationship of relationships"
              >
                <ion-item>
                  <ion-icon name="person" class="icon-lg"></ion-icon>
                  <ion-label>
                    <h2>{{ relationship.name }}</h2>
                    <small>DID: {{ relationship.did }}</small>
                  </ion-label>
                  <!--<ion-badge color="primary" item-end>2</ion-badge>-->
                </ion-item>
              </ion-item-sliding>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
      <!--<ion-grid>
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
                <ion-label>Date Issued</ion-label>
                <ion-badge color="medium" item-end></ion-badge>
              </ion-item>

              <ion-item
                class="flex ion-justify-content-around"
                *ngFor="let attr of active.attributes"
              >
                <ion-label>{{ attr }}</ion-label>
              </ion-item>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>-->
    </form>
  `,
  styleUrls: ['./issue-credential-relationships.component.scss']
})
export class IssueCredentialRelationshipsComponent implements OnInit {
  active$: Observable<ICredentialDef>;
  relationships: Observable<IRelationship[]>;
  fg: FormGroup;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public relationShipActionService: RelationshipActionsService,
    private stateSvc: CredentialStateService,
    private actionSvc: CredentialActionsService
  ) {
    this.active$ = this.actionSvc.getCredential(
      this.route.snapshot.paramMap.get('id')
    );
  }

  ngOnInit() {
    this.relationships = this.relationShipActionService.getRelationshipByState(
      'active'
    );

    const fg = new FormGroup({
      name: new FormControl('', [Validators.required])
    });

    this.fg = fg;
  }
}
