import { Component, OnInit } from '@angular/core';
import { CredentialActionsService } from 'src/app/credentials/services/credential-actions.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { RelationshipActionsService } from 'src/app/credentials/services/relationship-actions.service';
import { IRelationship } from 'src/app/messages/services/messages-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProofActionService } from '../../services/proof-action.service';
import { MessagesService } from 'src/app/core/services/messages.service';

export interface IProofProposal {
  connection_id: string;
  proof_request: ProofRequest;
}
export interface ProofRequest {
  version: string;
  name: string;
  requested_predicates: RequestedPredicates;
  requested_attributes: RequestedAttributes;
}
export interface RequestedPredicates {}
export interface RequestedAttributes {
  [key: string]: IRestrictions;
}
export interface IRestrictions {
  name: string;
  restrictions?: RestrictionsEntity[] | null;
}
export interface RestrictionsEntity {
  issuer_did: string;
  schema_version: string;
  schema_id: string;
  cred_def_id: string;
  schema_name: string;
  // attr::corp_num::value: string;
}

@Component({
  selector: 'app-issue-proof',
  template: `
    <ion-header
      role="banner"
      class="ios header-ios hydrated"
      *ngIf="credDef$ | async as credDef"
    >
      <ion-toolbar class="ios hydrated">
        <ion-title class="ios title-ios hydrated"
          >Request Proof To<strong>{{ credDef.name }}</strong></ion-title
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
      <form [formGroup]="fg">
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
          <ion-row>
            <ion-col>
              <ion-item *ngIf="credDef$ | async as credDefs">
                <ion-label position="stacked"
                  >Credential Type
                  <ion-text color="danger">*</ion-text>
                </ion-label>
                <ion-select required formControlName="credDef">
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
                  <ng-container *ngFor="let credDef of credDefs">
                    <ion-select-option [value]="credDef" selected>
                      {{ credDef.name }}
                    </ion-select-option>
                  </ng-container>
                </ion-select>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-item
                ><ion-label position="stacked"
                  >Proof Proposal Comment
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
            Request Proof
          </ion-button>
        </div>
      </form>
    </ion-content>
  `,
  styleUrls: ['./issue-proof.component.css'],
})
export class IssueProofComponent implements OnInit {
  credDef$: Observable<any[]>;
  fg: FormGroup;
  relationships$: Observable<IRelationship[]>;
  relId: string;
  constructor(
    private credentialActionSvc: CredentialActionsService,
    private relationshipsActionSvc: RelationshipActionsService,
    private proofActionSvc: ProofActionService,
    private route: ActivatedRoute,
    private router: Router,
    private mssg: MessagesService,
  ) {
    this.fg = new FormGroup({
      connectionId: new FormControl(''),
      credDef: new FormControl(''),
      comment: new FormControl(''),
    });
  }

  ngOnInit() {
    this.relId = this.route.snapshot.paramMap.get('id');
    this.credDef$ = this.credentialActionSvc.getCredentialDefs();
    this.relationships$ = this.relationshipsActionSvc.getRelationships();
    this.fg.controls.connectionId.setValue(this.relId);
    this.fg.updateValueAndValidity();
  }

  isSelectedRelationship(rId) {
    // if (rId === this.relationshipId) debugger;
    return rId === this.relId;
  }
  async submit() {
    const proof = this.fg.value;
    const credId = proof.credDef._id.slice(proof.credDef._id.indexOf('_') + 1);
    try {
      const res = await this.proofActionSvc
        .getProposal({
          relId: proof.connectionId,
          credId,
          schemaId: proof.credDef.schemaId,
        })
        .toPromise();

      const proposal = res.proofProposal;

      proposal.comment = proof.comment;
      const submitted = await this.proofActionSvc
        .postProof({ ...proposal })
        .toPromise();

      this.router.navigate(['verify-credentials/view/' + submitted._id]);
    } catch (err) {
      this.mssg.presentToast('Something went wrong' + err.message, 3000);
    }
  }
}
