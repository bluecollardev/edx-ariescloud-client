import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CredentialStateService,
  ICredentialDef,
} from '../../services/credential-state.service';
import { CredentialActionsService } from '../../services/credential-actions.service';
import { RelationshipActionsService } from '../../services/relationship-actions.service';
import { IRelationship } from '../../../relationships/services/relationships-state.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

// import { ICredentialResponse } from '../../models/i-credential';

@Component({
  selector: 'app-issue-credential-relationships',
  template: `
    <app-item-header title="Select Credential to Issue" default="/issuer">
    </app-item-header>

    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ng-container *ngIf="credDefs$ | async as credDefs; else noDefs">
              <ion-list *ngIf="credDefs.length > 0; else noDefs">
                <ion-list-header class="ion-no-margin ion-no-padding">
                  <div
                    style="display: flex; width: 100%; flex-direction: column"
                  >
                    <span class="ion-padding">Credential Types</span>
                  </div>
                </ion-list-header>
                <ion-item-sliding *ngFor="let credDef of credDefs">
                  <ion-item (click)="issue(credDef._id)">
                    <ion-label>
                      <h2>{{ credDef.name }}</h2>
                      <p>{{ credDef.program }}</p>
                      <p>Version: {{ credDef.version }}</p>

                      <ion-note *ngFor="let attr of credDef.attributes">{{
                        attr
                      }}</ion-note>
                    </ion-label>
                  </ion-item>
                </ion-item-sliding>
              </ion-list>
            </ng-container>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ng-template #noDefs>
      <ion-card text-center>
        <ion-card-header>
          <ion-card-title>
            <h2>
              You have no credential definitions.
            </h2>
          </ion-card-title>
          <ion-card-subtitle>
            Create a new credential type to start issuing!
          </ion-card-subtitle>
        </ion-card-header>
      </ion-card>
    </ng-template>
  `,
  styleUrls: ['./issue-credential-relationships.component.scss'],
})
export class IssueCredentialRelationshipsComponent implements OnInit {
  active$: Observable<ICredentialDef>;
  relationships: Observable<any[]>;
  fg: FormGroup;
  selected: EventEmitter<string> = new EventEmitter();
  credDefs$: Observable<ICredentialDef[]>;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public relationShipActionService: RelationshipActionsService,
    private stateSvc: CredentialStateService,
    private actionSvc: CredentialActionsService,
  ) {
    this.credDefs$ = this.actionSvc.getCredentialDefs();
  }

  ngOnInit() {
    this.relationships = this.relationShipActionService.getRelationshipByState(
      'active',
    );

    const fg = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    this.fg = fg;
    this.fg.valueChanges.subscribe(selected => this.selected.emit(selected));
  }
  issue(id: string) {
    console.log(id);
    this.router.navigate([`credentials/issue/${id}`]);
  }
}
