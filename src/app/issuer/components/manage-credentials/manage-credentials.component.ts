import { Component, OnInit } from '@angular/core';
import { CredentialActionsService } from 'src/app/credentials/services/credential-actions.service';
import { mergeMap, flatMap, tap } from 'rxjs/operators';
import { RelationshipActionsService } from 'src/app/credentials/services/relationship-actions.service';
import { IRelationshipResponse } from 'src/app/messages/models/i-relationship';
import { Observable } from 'rxjs';
import { IRelationship } from 'src/app/messages/services/messages-state.service';
import { ActionSheetController } from '@ionic/angular';
import { HttpService } from 'src/app/core/services/http.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
  selector: 'app-manage-credentials',
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
        <ion-title class="ios title-ios hydrated">Credentials</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-toolbar>
      <ion-buttons slot="secondary">
        <ion-button [routerLink]="['/credentials/create']">
          <ion-label>Create</ion-label>
          <ion-icon name="circle-add"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button [routerLink]="['/credentials/relationship']">
          <ion-label>Issue</ion-label>
          <ion-icon name="add-circle"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
    <ion-content>
      <ion-list *ngIf="$all | async as creds; else noCreds">
        <ng-container *ngIf="creds.length > 0; else noCreds">
          <ion-list-header> </ion-list-header>
          <ion-item-sliding
            *ngFor="let cred of creds"
            (click)="navigate(cred.credential_exchange_id)"
          >
            <ion-item>
              <ion-icon name="cog" size="medium" slot="start"></ion-icon>
              <ion-list>
                <ion-label>
                  <h2>{{ cred.name || 'Unnamed Credential' }}</h2>
                  <ion-row>
                    <small>State: {{ cred.state }}</small>
                  </ion-row>
                  <ion-row>
                    <small
                      >Created: {{ cred.created_at | date: 'short' }}</small
                    >
                  </ion-row>
                </ion-label>
              </ion-list>
            </ion-item></ion-item-sliding
          ></ng-container
        ></ion-list
      >
    </ion-content>
    <ng-template #noCreds>
      <ion-card text-center>
        <ion-card-header *ngIf="timeout">
          <ion-card-title>
            <h2>
              There's no Credentials
            </h2>
          </ion-card-title>
          <ion-card-subtitle>
            Start with a Credential Type or issue an existing one!
          </ion-card-subtitle>
        </ion-card-header>
        <ion-item *ngIf="!timeout">
          <ion-spinner></ion-spinner><ion-label>loading</ion-label>
        </ion-item>
      </ion-card>
    </ng-template>
  `,
  styleUrls: ['./manage-credentials.component.css'],
})
export class ManageCredentialsComponent extends BaseComponent
  implements OnInit {
  $all: Observable<any>;
  $relationships: Observable<IRelationship[]>;
  actionMap = {
    offer_received: true,
    offer_sent: false,
    request_received: true,
    request_sent: false,
    credential_received: true,
    issued: false,
  };
  _id: any;
  loadingController: any;
  timeout = false;

  constructor(
    private actionSvc: CredentialActionsService,
    private relActionSvc: RelationshipActionsService,
    public actionSheetCtrl: ActionSheetController,
    private httpSvc: HttpService,
    public router: Router,
    private loadingSvc: LoadingService,
  ) {
    super();
  }

  ngOnInit() {
    setTimeout(() => {
      this.timeout = true;
      console.log('run');
    }, 2000);
    this.$relationships = this.relActionSvc.getRelationships();
    this.$all = this.actionSvc.getFlatCredentials().pipe(
      flatMap(
        source => this.relActionSvc.getRelationships(),
        (source, next) => {
          let mapped = source.map(itm => ({
            name: next.filter(conn => conn._id === itm.connection_id)[0].name,
            ...itm,
          }));
          return mapped;
        },
      ),
      flatMap(
        source => this.actionSvc.getCredentialDefs(),
        (source, next) => {
          const mapped = source.map(
            itm => ({
              ...itm,
              label: next.filter(
                credDef =>
                  itm.credential_definition_id ===
                  credDef._id.slice(credDef._id.indexOf('_') + 1),
              )[0].name,
            }),
            ///,
          );
          return mapped;
        },
      ),
      tap(val => console.log(val)),
    );
  }

  async navigate(id: string) {
    this.router.navigate(['/credentials/pending/' + id]);
  }

  async presentActionSheet(id: string, state: string) {
    this._id = id;
    console.log(this._id);
    const opts = {
      buttons: [
        {
          text: 'View',
          handler: () => {
            this.router.navigate(['/credentials/pending/' + this._id]);
          },
          role: '',
        },
      ],
    };
    const decline = {
      text: 'Decline',
      handler: async () => {
        const rm = await this.httpSvc.delete('issues', this._id);
        return true;
      },
      role: 'destructive',
    };

    const accept = {
      text: 'Accept ' + state,
      handler: async () => {
        const loading = await this.loadingSvc.presentLoading();
        await loading.present();
        try {
          const post = await this.httpSvc
            .postById<{ _id: string }>('issues', this._id)
            .toPromise();
          if (post) {
            setTimeout(() => {
              loading.dismiss();
              this.router.navigate(['/credentials/pending/' + this._id]);
            }, 3000);

            return true;
          }
        } catch {
          loading.dismiss();
          return false;
        }
      },
      role: 'destructive',
    };
    this.actionMap[state]
      ? opts.buttons.push(accept)
      : opts.buttons.push(decline);

    const actionSheet = await this.actionSheetCtrl.create(opts);

    await actionSheet.present();
  }
}
