import { Component, OnInit } from '@angular/core';
import { CredentialActionsService } from '../../services/credential-actions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IIssueResponse } from '../../models/i-issue';
import { Observable, concat } from 'rxjs';
import { ICredentialDef } from '../../services/credential-state.service';
import { IRelationship } from 'src/app/messages/services/messages-state.service';
import { RelationshipActionsService } from '../../services/relationship-actions.service';
import { mergeMap, tap, toArray, take, reduce, map } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { HttpService } from 'src/app/core/services/http.service';
import { MessagesService } from 'src/app/core/services/messages.service';

export interface IPendingCredView extends IIssueResponse {
  credDef: ICredentialDef;
  relation?: string;
}

export interface IPendingCreds {
  chips: [any[]];
}

@Component({
  selector: 'app-view-pending-credential',
  template: `
    <app-item-header
      title="Pending Credential"
      default="/credentials/received"
    ></app-item-header>
    <ion-content color="light" *ngIf="$data | async as data; else loading">
      <ion-fab vertical="top" horizontal="end" slot="fixed">
        <ion-fab-button [disabled]="disabled" (click)="action()">
          <ion-icon name="build"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-card>
        <img
          src="https://insidelatinamerica.net/wp-content/uploads/2018/01/noImg_2.jpg"
        />
        <ion-list>
          <app-list-header [title]="data.credDef.name"></app-list-header>
          <app-chip
            [label]="data.relation"
            icon="people"
            iconColor="primary"
            labelColor="primary"
          ></app-chip>
          <app-chip
            label="{{ data.created | date: 'short' }}"
            icon="time"
            iconColor="secondary"
            labelColor="secondary"
          ></app-chip>
          <app-chip
            [label]="data.initiator"
            icon="at"
            iconColor="secondary"
            labelColor="secondary"
          ></app-chip>
          <app-list-header [title]="data.credDef.name"> </app-list-header>
          <app-list-item-stacked label="@type" [value]="data.proposal['@type']">
          </app-list-item-stacked>
          <app-list-item-stacked label="@id" [value]="data.proposal['@id']">
          </app-list-item-stacked>
          <app-list-item-stacked
            label="Cred Def Id"
            [value]="data.proposalcred_def_id"
          >
          </app-list-item-stacked>
          <app-list-item
            color="primary"
            label="State"
            [value]="data.state"
          ></app-list-item>
          <app-list-item
            color="secondary"
            label="Proposal Comment"
            [value]="data.proposal.comment"
          ></app-list-item>
          <ion-item-divider color="dark">
            <ion-label>
              Credential Proposal
            </ion-label>
          </ion-item-divider>
          <app-list-item-stacked
            label="@type"
            [value]="data.proposal.credential_proposal['@type']"
          >
          </app-list-item-stacked>
          <ion-item-divider color="medium">
            <ion-label>
              Attributes
            </ion-label>
          </ion-item-divider>
          <app-list-item
            *ngFor="let attr of data.proposal.credential_proposal.attributes"
            color="primary"
            [label]="attr.name"
            [value]="attr.value"
          ></app-list-item>
        </ion-list>
      </ion-card>
    </ion-content>
    <ng-template #loading>
      <ion-item>
        <ion-label>Loading</ion-label>
        <ion-spinner></ion-spinner>
      </ion-item>
    </ng-template>
  `,
  styleUrls: ['./view-pending-credential.component.css'],
})
export class ViewPendingCredentialComponent implements OnInit {
  actionMap = {
    offer_received: true,
    offer_sent: false,
    request_received: true,
    request_sent: false,
    credential_received: true,
    issued: false,
  };

  $data: Observable<IPendingCredView>;
  id: string;
  state: string;
  get disabled() {
    const map = ['offer_received', 'request_received', 'credential_received'];
    return map.some(state => this.state === state);
  }
  constructor(
    private actionSvc: CredentialActionsService,
    private relActionSvc: RelationshipActionsService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private mssg: MessagesService,
    private httpSvc: HttpService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.id = id;

    this.$data = this.actionSvc.getIssueById(id).pipe(
      mergeMap(
        val => this.relActionSvc.getRelationshipById(val.connectionId),
        (source, next) => ({ ...source, relation: next.name }),
      ),
      mergeMap(
        val =>
          this.actionSvc.getCredentialDef('cdef_' + val.proposal.cred_def_id),
        (source, next) => ({ credDef: next, ...source }),
      ),
      tap(val => (this.state = val.state)),
    );
    const example = this.$data.subscribe(obs => console.log(obs));
  }

  async action() {
    const loading = await this.loadingController.create({
      message: 'Accepting credential stage',
      duration: 10000,
    });
    await loading.present();
    try {
      const post = await this.httpSvc
        .postById<{ _id: string }>('issues', this.id)
        .toPromise();
      if (post) {
        setTimeout(() => {
          loading.dismiss();
          this.router.navigate(['/credentials/pending/' + this.id]);
        }, 3000);

        return true;
      }
    } catch {
      loading.dismiss();
      this.mssg.alert({});
      return false;
    }
  }
}
