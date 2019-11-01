import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

import {
  CredentialStateService,
  ICredential,
  IIssuer
} from '../../../credentials/services/credential-state.service';
import {
  RelationshipsStateService,
  IRelationship
} from '../../../relationships/services/relationships-state.service';
import { CredentialActionsService } from '../../../credentials/services/credential-actions.service';
import { RelationshipsActionService } from '../../../relationships/services/relationships-action.service';

@Component({
  selector: 'app-org-credentials',
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
        <ion-title class="ios title-ios hydrated"> Credentials</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col sizeXs="12" sizeMd="12" pushMd="12" sizeXl="8" pushXl="2">
            <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>
          </ion-col>
        </ion-row>
        <ion-row *ngIf="credentials$ | async as creds">
          <ion-col sizeXs="12" sizeMd="12" pushMd="12" sizeXl="8" pushXl="2">
            <ion-grid style="width: 100%;">
              <!--<ion-row>
                <ion-col>
                  <ion-list-header>
                    <ion-label>My Credentials</ion-label>
                  </ion-list-header>
                </ion-col>
              </ion-row>-->
              <ion-row>
                <ion-col
                  *ngFor="let cred of creds"
                  sizeXs="6"
                  sizeSm="4"
                  sizeMd="3"
                  sizeLg="2"
                >
                  <ion-card
                    text-center
                    (click)="this.presentActionSheet(cred.id)"
                  >
                    <ion-card-header>
                      {{ cred.label }}
                    </ion-card-header>
                    <ion-icon name="document" class="icon-lg"></ion-icon>
                    <ion-card-content>
                      <small
                        ><strong>{{ cred.schema.name }}</strong></small
                      >
                      <br />
                      <small>{{ cred.program }}</small>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./org-credentials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgCredentialsComponent implements OnInit {
  searchQuery: '';
  issuer: IIssuer;
  credentials$: Observable<any[]>;
  issuer$: Observable<any[]>;
  relationships: Observable<IRelationship[]>;
  issuers: Observable<IIssuer[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public stateSvc: CredentialStateService,
    public relationshipStateSvc: RelationshipsStateService,
    private actionSvc: CredentialActionsService,
    private relationshipActionSvc: RelationshipsActionService,
    public actionSheetCtrl: ActionSheetController,
    private alertController: AlertController
  ) {
    this.initializeItems();
    this.setOrgName();
  }

  ngOnInit() {
    const did = this.route.snapshot.paramMap.get('did');
    // const creds = await this.actionSvc.getCredentials().toPromise();
    // const filtered = creds.filter(itm => itm.did === did);
    // this.credentials = of(filtered);
    this.credentials$ = this.actionSvc.getCredentials().pipe(
      map(obs => obs.filter(itm => itm.did === did)),
      tap(obs => (this.issuer$ = of(obs))),
      map(obs => obs.map(credgroup => credgroup.credentials[0]))
    );
    this.relationships = this.relationshipStateSvc.relationships$;

    this.issuers = this.stateSvc.issuers$;

    this.credentials$.subscribe(obs => console.log(obs));
  }

  async setOrgName() {
    this.stateSvc.issuers$
      .pipe(
        map(is => {
          return is.filter(
            i => i.did === this.route.snapshot.paramMap.get('did')
          )[0];
        })
      )
      .subscribe(issuer => {
        this.issuer = issuer;
      });
  }

  async initializeItems() {
    await this.actionSvc.getCredentials({
      did: this.route.snapshot.paramMap.get('did')
    });
  }

  async getItems(issuers, ev: any) {
    const filtered = [];
    // Reset items back to all of the items
    await this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      /*this.issuers = this.issuers.filter(item => {
        return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });*/
    }

    return filtered;
  }

  async presentActionSheet(credId: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'View',
          handler: () =>
            this.router.navigate([`/credentials-received/view/${credId}`])
        },
        {
          text: 'Share',
          handler: () => {
            this.shareCredPopup();
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    await actionSheet.present();
  }

  async shareCredPopup() {
    const alert = await this.alertController.create({
      header: 'Share Credential',
      message: 'Please choose a relationship to share this credential with.',
      inputs: [
        {
          name: 'checkbox1',
          type: 'checkbox',
          label: 'ACME Inc.',
          value: 'value1',
          checked: false
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
            this.selectDataPopup();
          }
        }
      ]
    });

    await alert.present();
  }

  async selectDataPopup() {
    const alert = await this.alertController.create({
      header: 'Select Data',
      message: 'Please select what information you want to share.',
      inputs: [
        {
          name: 'checkbox1',
          type: 'checkbox',
          label: 'Degree',
          value: 'value1',
          checked: false
        },
        {
          name: 'checkbox2',
          type: 'checkbox',
          label: 'Program',
          value: 'value2',
          checked: false
        },
        {
          name: 'checkbox3',
          type: 'checkbox',
          label: 'Date of Study',
          value: 'value3',
          checked: false
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
            this.credSharedPopup();
          }
        }
      ]
    });

    await alert.present();
  }

  async credSharedPopup() {
    const alert = await this.alertController.create({
      header: 'Credential Shared',
      message: 'Success! Your credential was shared with ACME Inc.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }
}
