import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ICredentialDef,
  ICredential
} from '../../services/credential-state.service';
import { CredentialActionsService } from '../../services/credential-actions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RelationshipsActionService } from 'src/app/relationships/services/relationships-action.service';
import { IRelationship } from 'src/app/messages/services/messages-state.service';
import { tap, map } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { HttpService } from 'src/app/core/services/http.service';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-issue-credential',
  template: `
    <ion-header
      role="banner"
      class="ios header-ios hydrated"
      *ngIf="credDef$ | async as credDef"
    >
      <ion-toolbar class="ios hydrated">
        <ion-title class="ios title-ios hydrated"
          >Issue <strong>{{ credDef.name }}</strong></ion-title
        >
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
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <app-issue-credential-relationships
        *ngIf="this.activeTab === 'select-recipient'"
      >
      </app-issue-credential-relationships>
      <form [formGroup]="fg" *ngIf="this.activeTab === 'issue-credential'">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label position="stacked"
                  >Issue To
                  <ion-text color="danger">*</ion-text>
                </ion-label>
                <ion-select
                  required
                  formControlName="connectionId"
                  *ngIf="relationships$ | async as relationships"
                >
                  <!-- TODO: Upgrade ionic to > 4.9 https://github.com/ionic-team/ionic/issues/16453 -->
                  <!-- We can't do... -->
                  <!--
                  <ion-select-option
                      *ngIf="!isSelectedRelationship(relationship._id)"
                      [value]="relationship._id"
                      [selected]="isSelectedRelationship(relationship._id)"
                    >
                      {{ relationship.name }}
                    </ion-select-option>
                  -->

                  <ng-container *ngFor="let relationship of relationships">
                    <ion-select-option
                      *ngIf="isSelectedRelationship(relationship._id)"
                      [value]="relationship._id"
                      selected
                    >
                      {{ relationship.name }}
                    </ion-select-option>

                    <ion-select-option
                      *ngIf="!isSelectedRelationship(relationship._id)"
                      [value]="relationship._id"
                    >
                      {{ relationship.name }}
                    </ion-select-option>
                  </ng-container>
                </ion-select>
              </ion-item>
            </ion-col>
          </ion-row>
          <ng-container *ngIf="fa$ | async as fa">
            <ion-row *ngFor="let vfg of fa.controls">
              <ion-col>
                <ion-item
                  ><ion-label position="stacked"
                    >{{ vfg.value.name }}
                    <ion-text color="danger">*</ion-text>
                  </ion-label>
                  <ion-input [formControl]="vfg.controls.value"></ion-input>
                </ion-item>
              </ion-col>
            </ion-row>
          </ng-container>
          <ion-row>
            <ion-col>
              <ion-item
                ><ion-label position="stacked"
                  >Comment
                  <ion-text color="danger">*</ion-text>
                </ion-label>
                <ion-input formControlName="comment"></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
        <div style="display: flex">
          <ion-button
            style="flex: 1"
            color="primary"
            clear
            full
            icon-start
            margin
            (click)="submit()"
          >
            <ion-icon name="checkmark"></ion-icon>
            Issue Credential(s)
          </ion-button>
        </div>
      </form>
    </ion-content>
  `,
  styleUrls: ['./issue-credential.component.scss']
})
export class IssueCredentialComponent implements OnInit {
  activeTab: string;
  credDef$: Observable<ICredentialDef>;
  credDefId: string;
  fg: FormGroup;
  fa$: Observable<FormArray>;
  relationships$: Observable<IRelationship[]>;
  relationshipId: string;

  validStates = ['to'];

  constructor(
    private actionSvc: CredentialActionsService,
    private relationshipsActionSvc: RelationshipsActionService,
    private route: ActivatedRoute,
    private router: Router,
    private httpSvc: HttpService,
    public loadingController: LoadingController
  ) {
    this.fg = new FormGroup({
      connectionId: new FormControl(''),
      comment: new FormControl('')
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.credDef$ = this.actionSvc.getCredentialDef(id).pipe(
      tap(obs => (console.log(obs), (this.credDefId = obs._id))),
      tap(obs => {
        const fa = new FormArray([]);
        console.log(obs);
        obs.attributes.forEach(val =>
          fa.push(
            new FormGroup({
              name: new FormControl(val),
              value: new FormControl('')
            })
          )
        );
        this.fa$ = of(fa);
      })
    );

    this.relationships$ = this.relationshipsActionSvc
      .getRelationships() // TODO: Fix this hack!
      .pipe(
        map(obs =>
          obs.filter(itm => {
            console.log('active relationship');
            console.log(itm);
            return itm.state === 'active';
          })
        )
      );
    // .pipe(map(obs => obs.filter(itm => itm.state === 'active')));

    this.route.queryParams.subscribe(params => {
      console.log(params);

      this.relationshipId = params.rId;
      console.log('relationship id to match');
      console.log(this.relationshipId);
      this.fg.get('connectionId').setValue(this.relationshipId);
    });

    this.route.url.subscribe(segments => {
      this.setActiveTab(segments);
    });
  }

  setActiveTab(segments) {
    console.log(segments);
    this.activeTab = 'select-recipient';

    if (segments instanceof Array && segments.length > 3) {
      if (this.validStates.indexOf(segments[3].path) > -1) {
        this.activeTab = 'issue-credential';
      }
    }
  }

  isSelectedRelationship(rId) {
    // if (rId === this.relationshipId) debugger;
    return rId === this.relationshipId;
  }

  async submit() {
    const loading = await this.loadingController.create({
      message: 'Submitting the credential',
      duration: 10000
    });
    await loading.present();
    const fa = await this.fa$.toPromise();

    const ret = {
      connectionId: this.fg.value.connectionId,
      credDefId: this.credDefId.slice(this.credDefId.indexOf('_') + 1),
      comment: this.fg.value.comment,
      attrs: fa.value
    };
    console.log(ret);
    // "attrs": [{"name": "name", "value": "Science"}]
    try {
      const res = await this.httpSvc.post('issues', ret).toPromise();
      if (res) {
        console.log('result', res);
        loading.dismiss();
        this.router.navigate(['/credentials']);
      }
    } catch (err) {
      console.log('error', err);
      loading.dismiss();
    }
  }
}
